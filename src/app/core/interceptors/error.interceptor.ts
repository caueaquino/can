import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import { Token } from 'src/app/shared/models/token.model';
import { HttpRequestResult } from 'src/app/shared/models/http-request-result.model';
import { AuthService } from 'src/app/core/services/auth.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    private REFRESH_TOKEN_URL = `refreshTokenUrlRequest`;

    private isRefreshing = false;
    private resfreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private attemptsRefreshToken = 0;

    constructor(
        private authService: AuthService,
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this.authService.accessToken;
        return next.handle(request).pipe(
            tap((res: any) => {
                if (res.status === 401 && request.url !== this.REFRESH_TOKEN_URL) {
                    this.attemptsRefreshToken = 0;
                }
            }),
            catchError((error: HttpErrorResponse) => {
                if (request.url === this.REFRESH_TOKEN_URL && accessToken) {
                    return this.handleRefreshTokenError(error);
                }
                if (error.status === 401 && accessToken) {
                    return this.handle401Error(request, next, error);
                }
                this.attemptsRefreshToken = 0;
                return throwError(error);
            }));
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse): Observable<any> {
        if (this.attemptsRefreshToken > 2) {
            this.authService.logout();
            return throwError(error);
        }
        return this.handle401Requests(request, next);
    }

    private handle401Requests(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.resfreshTokenSubject.next(null);
            this.attemptsRefreshToken++;

            return this.authService.doRefreshToken().pipe(
                switchMap((token: HttpRequestResult<Token>) => {
                    this.authService.storeCanTokens(token.data);
                    this.isRefreshing = false;
                    this.resfreshTokenSubject.next(token.data.accessToken);
                    return next.handle(this.addToken(request, token.data.accessToken));
                })
            );
        } else {
            return this.resfreshTokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(token => {
                    return next.handle(this.addToken(request, token));
                }));
        }
    }

    private handleRefreshTokenError(error: HttpErrorResponse): Observable<any> {
        if (this.attemptsRefreshToken > 2) {
            this.authService.logout();
            return throwError(error);
        }
        return this.retryRefreshToken();
    }

    private retryRefreshToken(): Observable<any> {
        this.attemptsRefreshToken++;
        return this.authService.doRefreshToken();
    }

    private addToken(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                Authorization: `${accessToken}`
            }
        });
    }
}
