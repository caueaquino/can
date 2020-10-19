import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { User } from 'src/app/shared/models/user.model';
import { HttpRequestResult } from 'src/app/shared/models/http-request-result.model';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class UserService {

    private readonly BASE_URL = `${environment.apiUrl}users.json`;
    // private readonly BASE_URL_MOCK = `assets/mocks/user-list.json`;

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * @description Get user by param id received and return a Observable of it.
     * @param userId Number of user id.
     * @returns Return an Observeble of HttpRequestResult model with user data into it if request was success.
     */
    getUserById(userId: number): Observable<HttpRequestResult<User>> {
        const url = `${this.BASE_URL}`;
        return this.http.get<HttpRequestResult<any>>(url)
            .pipe(map(res => {
                res.data = res.data.find(user => user.id === userId);
                return res;
            }));
    }

    /**
     * @description Do a request to api asking for user list data an return an Observable of it.
     * @returns Return an Observable of HttpRequestResult model with user list data into it.
     */
    getUsers(): Observable<HttpRequestResult<Array<User>>> {
        const url = `${this.BASE_URL}`;
        return this.http.get<HttpRequestResult<Array<User>>>(url);
    }

    /**
     * @description Do a request to api to add an new user in database.
     * @param user User Model.
     * @returns Return an Observable of the result of the add request of a new user object.
     */
    addUser(user: User): Observable<any> {
        const url = `${this.BASE_URL}`;
        return this.http.get<HttpRequestResult<Array<User>>>(url)
            .pipe(switchMap((res: HttpRequestResult<Array<User>>) => {
                return this.http.put(url, res);
            }));
    }

    /**
     * @description Do a request to api to update an user in database.
     * @param user User Model.
     * @returns Return an Observable of the result of the put request to update an user object.
     */
    updateUser(user: User): Observable<any> {
        const url = `${this.BASE_URL}`;
        return this.http.get<HttpRequestResult<Array<User>>>(url)
            .pipe(switchMap((res: HttpRequestResult<Array<User>>) => {
                res.data = res.data.map(item => {
                    if (item.id === user.id) {
                        return user;
                    }
                    return item;
                });
                return this.http.put(url, res);
            }));
    }
}
