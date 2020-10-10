import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Videos } from 'src/app/shared/models/videos.model';
import { HttpRequestResult } from 'src/app/shared/models/http-request-result.model';
import { CanloadingService } from 'src/app/modules/components/can-loading/can-loading.service';
import { VideoService } from 'src/app/core/services/video.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public listVideos: Array<Videos> = new Array<Videos>();

  constructor(
    private videoService: VideoService,
    private canLoadingService: CanloadingService,
  ) { }

  public ngOnInit(): void {
    this.loadInitialData();
  }

  public loadInitialData(): void {
    this.canLoadingService.handleLoad(this.videoService.getVideos())
      .subscribe((res: HttpRequestResult<Array<Videos>>) => {
        this.listVideos = res.data;
      }, (error: HttpErrorResponse) => {
        console.error(error);
      });
  }

  public playVideo(video: Videos): void {
    const containerVideo = document.querySelector(`#containerVideo${video.id}`);
    containerVideo.innerHTML = `<iframe width="853" height="480" src="${video.videoUrl}?autoplay=true" frameborder="0" allow="accelerometer; autoplay="true"; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }

  public commentVideo(video: Videos): void {
    const inputValue = document.querySelector(`#inputComment${video.id}`);
    video.comments.push(inputValue.value);
    inputValue.value = '';
  }

}
