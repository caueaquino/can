import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { Videos } from 'src/app/shared/models/videos.model';
import { HttpRequestResult } from 'src/app/shared/models/http-request-result.model';


@Injectable({ providedIn: 'root' })
export class VideoService {

    private readonly BASE_URL = `assets/mocks/`;

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * @description Get video by param id received and return a Observable of it.
     * @param userId Number of video id.
     * @returns Return an Observeble of HttpRequestResult model with video data into it if request was success.
     */
    public getVideoById(videoId: number): Observable<HttpRequestResult<Videos>> {
        const url = `${this.BASE_URL}user-list.json`;
        return this.http.get<HttpRequestResult<any>>(url)
            .pipe(map(res => {
                res.data = res.data.find(video => video.id === videoId);
                return res;
            }),
            delay(1000));
    }

    /**
     * @description Do a request to api asking for video list data an return an Observable of it.
     * @returns Return an Observable of HttpRequestResult model with video list data into it.
     */
    public getVideos(): Observable<HttpRequestResult<Array<Videos>>> {
        const url = `${this.BASE_URL}posts.json`;
        return this.http.get<HttpRequestResult<Array<Videos>>>(url).pipe(delay(1000));
    }

    /**
     * @description Do a request to api to add a new video object an return an Observable of it.
     * @param Video Videos mode.
     * @returns Return an Observable of the result of the add request of the video object.
     */
    public addVideo(video: Videos): Observable<HttpRequestResult<any>> {
        const url = `${this.BASE_URL}`;
        return this.http.post<HttpRequestResult<any>>(url, video);
    }
}
