import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { User } from 'src/app/shared/models/user.model';
import { HttpRequestResult } from 'src/app/shared/models/http-request-result.model';


@Injectable({ providedIn: 'root' })
export class UserService {

    private readonly BASE_URL = `assets/mocks/`;

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * @description Get user by param id received and return a Observable of it.
     * @param userId Number of user id.
     * @returns Return an Observeble of HttpRequestResult model with user data into it if request was success.
     */
    getUserById(userId: number): Observable<HttpRequestResult<User>> {
        const url = `${this.BASE_URL}user-list.json`;
        return this.http.get<HttpRequestResult<any>>(url)
            .pipe(map(res => {
                res.data = res.data.find(user => user.id === userId);
                return res;
            }),
            delay(1000));
    }

    /**
     * @description Do a request to api asking for user list data an return an Observable of it.
     * @returns Return an Observable of HttpRequestResult model with user list data into it.
     */
    getUsers(): Observable<HttpRequestResult<Array<User>>> {
        const url = `${this.BASE_URL}user-list.json`;
        return this.http.get<HttpRequestResult<Array<User>>>(url).pipe(delay(1000));
    }
}
