import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';

import { Videos } from 'src/app/shared/models/videos.model';
import { HttpRequestResult } from 'src/app/shared/models/http-request-result.model';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class VideoService {

    private readonly BASE_URL = `${environment.apiUrl}videos.json`;
    // private readonly BASE_URL = `assets/mocks/`;

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * @description Get video by param id received and return a Observable of it.
     * @param userId Number of video id.
     * @returns Return an Observeble of HttpRequestResult model with video data into it if request was success.
     */
    public getVideoById(videoId: number): Observable<HttpRequestResult<Videos>> {
        const url = `${this.BASE_URL}`;
        return this.http.get<HttpRequestResult<any>>(url)
            .pipe(map(res => {
                res.data = res.data.find(video => video.id === videoId);
                return res;
            }));
    }

    /**
     * @description Do a request to api asking for video list data an return an Observable of it.
     * @returns Return an Observable of HttpRequestResult model with video list data into it.
     */
    public getVideos(): Observable<HttpRequestResult<Array<Videos>>> {
        const url = `${this.BASE_URL}`;
        return this.http.get<HttpRequestResult<Array<Videos>>>(url).pipe(map((res => {
            res.data = res.data.reverse();
            return res;
        })));
    }

    /**
     * @description Do a request to api to add a new video object an return an Observable of it.
     * @param Video Videos mode.
     * @returns Return an Observable of the result of the add request of the video object.
     */
    public addVideo(video: Videos): Observable<HttpRequestResult<any>> {
        const url = `${this.BASE_URL}`;
        return this.getVideos().pipe(
            switchMap((res: HttpRequestResult<Array<Videos>>) => {
                video = Object.assign(video, { id: res.data.length + 1 });
                res.data.push(video);
                return this.http.put<any>(url, res);
            }));
    }

    public updateVideos(videos: Array<Videos>): Observable<any> {
        const url = `${this.BASE_URL}`;
        return this.http.put<any>(url, { data: videos, message: 'success', status: 0 });
    }
}
