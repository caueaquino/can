import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/shared/models/user.model';
import { Videos } from 'src/app/shared/models/videos.model';
import { UserService } from 'src/app/core/services/user.service';
import { VideoService } from 'src/app/core/services/video.service';
import { CanloadingService } from 'src/app/modules/components/can-loading/can-loading.service';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  public videoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private videoService: VideoService,
    private userService: UserService,
    private canLoadingService: CanloadingService,
  ) {
    this.videoForm = this.formBuilder.group({
      title: [null, Validators.required],
      artist: [null, Validators.required],
      videoUrl: [null, Validators.required],
      uploadDate: [{ value: new Date(), disabled: true }, Validators.required],
      user: [new User(), Validators.required],
      comments: [null],
    });
  }

  public get title(): AbstractControl {
    return this.videoForm.get('title');
  }

  public get artist(): AbstractControl {
    return this.videoForm.get('artist');
  }

  public get videoUrl(): AbstractControl {
    return this.videoForm.get('videoUrl');
  }

  public get uploadDate(): AbstractControl {
    return this.videoForm.get('uploadDate');
  }

  public get user(): AbstractControl {
    return this.videoForm.get('user');
  }

  public get comments(): AbstractControl {
    return this.videoForm.get('comments');
  }

  public ngOnInit(): void {
    this.setCreationUser();
  }


  public saveNewVideo(): void {
    const newVideo = this.videoForm.getRawValue() as Videos;

    this.canLoadingService.handleLoad(this.videoService.addVideo(newVideo))
      .subscribe(() => {

      }, (error: HttpErrorResponse) => {
        console.error(error);
      });
  }

  private setCreationUser(): void {
    this.canLoadingService.handleLoad(this.userService.getUserById(1))
      .subscribe((user: User) => {
        this.user.setValue(user);
      }, (error: HttpErrorResponse) => {
        console.error(error);
      });
  }

  private resetFormState(): void {

  }
}
