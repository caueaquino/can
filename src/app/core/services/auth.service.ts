import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Token } from 'src/app/shared/models/token.model';
import { HttpRequestResult } from 'src/app/shared/models/http-request-result.model';


@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly BASE_URL = ``;
    private loginn = 'assets/mocks/login.json';

    constructor(
        private http: HttpClient,
    ) { }

    public login(): Observable<HttpRequestResult<Token>> {
        const url = `${this.BASE_URL}`;
        return this.http.get<HttpRequestResult<Token>>(this.loginn);
    }

    public recoverPassword(): Observable<any> {
        const url = `${this.BASE_URL}`;
        return of(null).pipe(delay(1000));
    }
}
