import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from 'src/app/shared/models/user.model';
import { HttpRequestResult } from 'src/app/shared/models/http-request-result.model';


@Injectable({ providedIn: 'root' })
export class UserService {

    private readonly BASE_URL = `assets/mocks/`;

    constructor(
        private http: HttpClient,
    ) { }

    getUserById(userId: number): Observable<HttpRequestResult<User>> {
        const url = `${this.BASE_URL}user-list.json`;
        return this.http.get<HttpRequestResult<any>>(url)
            .pipe(map(res => {
                res.data = res.data.find(user => user.id === userId);
                return res;
            }));
    }

    getUsers(): Observable<HttpRequestResult<Array<User>>> {
        const url = `${this.BASE_URL}user-list.json`;
        return this.http.get<HttpRequestResult<Array<User>>>(url);
    }
}
