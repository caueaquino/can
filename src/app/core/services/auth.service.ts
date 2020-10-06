import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { Token } from 'src/app/shared/models/token.model';
import { HttpRequestResult } from 'src/app/shared/models/http-request-result.model';
import { UtilService } from 'src/app/core/services/util.service';
import { User } from 'src/app/shared/models/user.model';
import { delay, switchMap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly ACCESS_TOKEN = 'CAN_TOKEN';
    private readonly REFRESH_TOKEN = 'CAN_REFRESH_TOKEN';
    private readonly BASE_URL = `assets/mocks/`;


    constructor(
        private router: Router,
        private http: HttpClient,
        private utilService: UtilService,
    ) { }

    /**
     * @description Get of accessToken property data in localStorage.
     * @returns AccessToken value.
     */
    public get accessToken(): string {
        return this.utilService.getLocalStorageItem(this.ACCESS_TOKEN);
    }

    /**
     * @description Get of refreshToken property data in localStorage.
     * @returns RefreshToken value.
     */
    public get refreshToken(): string {
        return this.utilService.getLocalStorageItem(this.REFRESH_TOKEN);
    }

    /**
     * @description Set AccessToken and RefreshToken in localStorage receiving token data as param.
     * @param token Token model.
     * @returns Void.
     */
    public storeCanTokens(token: Token): void {
        this.utilService.setLocalStorageItem(this.ACCESS_TOKEN, token.accessToken);
        this.utilService.setLocalStorageItem(this.REFRESH_TOKEN, token.refreshToken);
    }

    /**
     * @description Remove AccessToken and RefreshToken from localStorage and navigate to signin page.
     * @returns Void.
     */
    public logout(): void {
        localStorage.removeItem(this.ACCESS_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
        this.router.navigate(['/auth/signin']);
    }

    /**
     * @description Get rsa publicKey from api and return an Observable of the request result.
     * @returns Returns an Observable of a HttpRequestResult model with the PublicKey into it on data property.
     */
    public getRsaPublicKey(): Observable<HttpRequestResult<any>> {
        const url = `${this.BASE_URL}rsa-public-key.json`;
        return this.http.get<HttpRequestResult<any>>(url).pipe(delay(1000));
    }

    /**
     * @description Get token data from api and return an Observable of the request result.
     * @param user User model.
     * @returns Returns an Observable of a HttpRequestResult model with Token data into it on data property.
     */
    public signin(user: User): Observable<HttpRequestResult<Token>> {
        const url = `${this.BASE_URL}login.json`;
        return this.http.get(`${this.BASE_URL}auth-user.json`).pipe(delay(1000), switchMap((res: HttpRequestResult<User>) => {
            if (res.data.userName === user.userName){
                return this.http.get<HttpRequestResult<Token>>(url);
            }
            return throwError({ status: 401 });
        }));
    }

    /**
     * @description Send a request to api with user to register it and returns the status of the action request.
     * @param user User model.
     * @returns Returns an Observable of a HttpRequestReult model with the status response of signup user request.
     */
    public signup(user: User): Observable<HttpRequestResult<any>> {
        const url = `${this.BASE_URL}`;
        return this.http.post<HttpRequestResult<any>>(url, user).pipe(delay(1000));
    }

    /**
     * @description Send request to api to change user password and return the status of the change request.
     * @param passwordChange PasswordChange model.
     * @returns Returns as Observable of a HttpRequestResult model with the status response of change password request..
     */
    public changePassword(passwordChange: any): Observable<HttpRequestResult<any>> {
        const url = `${this.BASE_URL}`;
        return this.http.post<HttpRequestResult<any>>(url, passwordChange).pipe(delay(1000));
    }

    /**
     * @description Send a request to api with an email that will receive the new password access.
     * @param email String value of user email.
     * @returns Returns an Obsrvable of a HttpRequestResult model with the status response of recover password request.
     */
    public recoverPassword(email: string): Observable<HttpRequestResult<any>> {
        const url = `${this.BASE_URL}`;
        return this.http.post<HttpRequestResult<any>>(url, { email }).pipe(delay(1000));
    }
}
