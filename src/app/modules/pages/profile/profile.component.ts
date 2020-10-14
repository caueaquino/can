import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { User } from 'src/app/shared/models/user.model';
import { HttpRequestResult } from 'src/app/shared/models/http-request-result.model';
import { emailDomainValidator } from 'src/app/shared/validators/email-domail.validator';
import { CanloadingService } from 'src/app/modules/components/can-loading/can-loading.service';
import { CanDialogService } from 'src/app/modules/components/can-dialog/can-dialog.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userData: User = new User();
  public userForm: FormGroup;
  public isEditing: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private canLoadingService: CanloadingService,
    private canDialog: CanDialogService,
  ) {
    this.userData.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.userForm = this.formBuilder.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required]],
      lastName: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
      email: [null, [Validators.required, emailDomainValidator]],
      avatarUrl: [null, []],
      language: [null, [Validators.required]]
    });
    this.userForm.disable();
  }

  /**
   * @description Get id AbstractControl of userform.
   * @returns Return id AbstracControl.
   */
  public get id(): AbstractControl {
    return this.userForm.get('id');
  }

  /**
   * @description Get name AbstractControl of userForm.
   * @returns Return name AbstractControl
   */
  public get name(): AbstractControl {
    return this.userForm.get('name');
  }

  /**
   * @description Get lastName AbstractControl of userForm.
   * @returns Return lastName AbstractControl.
   */
  public get lastName(): AbstractControl {
    return this.userForm.get('lastName');
  }

  /**
   * @description Get password AbstractControl of userForm.
   * @returns Return password AbstractControl.
   */
  public get password(): AbstractControl {
    return this.userForm.get('password');
  }

  /**
   * @description Get email AbstractControl of userForm.
   * @returns Return email AbstractControl.
   */
  public get email(): AbstractControl {
    return this.userForm.get('email');
  }

  /**
   * @description Get avatarUrl AbstractControl of userForm.
   * @return Return avatarUrl AbstractControl.
   */
  public get avatarUrl(): AbstractControl {
    return this.userForm.get('avatarUrl');
  }

  /**
   * @description Get language AbstractControl of userForm.
   * @returns Return language AbstractControl.
   */
  public get language(): AbstractControl {
    return this.userForm.get('language');
  }

  /**
   * @description Method that runs on the init of the Profile component calling loadProfileData method.
   * @returns Void.
   */
  public ngOnInit(): void {
    this.loadProfileData();
  }

  /**
   * @description Load user data by id, use the id param in angular route and set the user returned value to set userForm value.
   * @returns Void.
   */
  public loadProfileData(): void {
    this.canLoadingService.handleLoad(this.userService.getUserById(this.userData.id))
      .subscribe((res: HttpRequestResult<User>) => {
        this.userData = res.data;
        this.userForm.patchValue(this.userData);
      }, (error: HttpErrorResponse) => {
        console.error(error);
      });
  }

  /**
   * @description Verify if userForm is valid and save changes done in it.
   * @returns Void.
   */
  public saveProfileChanges(): void {
    if (this.userForm.invalid) {
      return;
    }
    this.userData = this.userForm.getRawValue() as User;
    this.canLoadingService.handleLoad(this.userService.updateUser(this.userData))
      .subscribe((res: any) => {
        this.canDialog.openDialog('Success', 'Profile data was updated successfully.');
        this.changeFormState();
      }, (error: HttpErrorResponse) => {
        this.canDialog.openDialog('Error', 'Error when trying to update profile data.');
        console.error(error);
      });
  }

  /**
   * @description Activate and Deactivate userForm edit.
   * @returns Void.
   */
  public changeFormState(): void {
    if (this.isEditing) {
      this.userForm.patchValue(this.userData);
      this.userForm.disable();
    } else {
      this.userForm.enable();
    }
    this.isEditing = !this.isEditing;
  }

}
