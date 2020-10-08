import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/core/services/user.service';
import { HttpRequestResult } from 'src/app/shared/models/http-request-result.model';
import { User } from 'src/app/shared/models/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userData: User = new User(null);
  public userForm: FormGroup;
  public isEditing: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.userData.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.userForm = this.formBuilder.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required]],
      lastName: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
      email: [null, [Validators.required]],
      avatarUrl: [null, []],
      language: [null, [Validators.required]]
    });
  }

  public get id(): AbstractControl {
    return this.userForm.get('id');
  }

  public get name(): AbstractControl {
    return this.userForm.get('name');
  }

  public get lastName(): AbstractControl {
    return this.userForm.get('lastName');
  }

  public get password(): AbstractControl {
    return this.userForm.get('password');
  }

  public get email(): AbstractControl {
    return this.userForm.get('email');
  }

  public get avatarUrl(): AbstractControl {
    return this.userForm.get('avatarUrl');
  }

  public get language(): AbstractControl {
    return this.userForm.get('language');
  }

  public ngOnInit(): void {
    this.loadProfileData();
  }

  public loadProfileData(): void {
    this.userService.getUserById(this.userData.id)
      .subscribe((res: HttpRequestResult<User>) => {
        this.userData = res.data;
        this.userForm.patchValue(this.userData);
      }, (error: HttpErrorResponse) => {
        console.error(error);
      });
  }

  public saveProfileChanges(): void {
    if (this.userForm.invalid) {
      return;
    }
  }

  public changeFormState(): void {
    if (this.isEditing) {
      this.userForm.patchValue(this.userData);
    }
    this.isEditing = !this.isEditing;
  }

}
