import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/shared/models/user.model';
import { Token } from 'src/app/shared/models/token.model';
import { HttpRequestResult } from 'src/app/shared/models/http-request-result.model';
import { CanloadingService } from 'src/app/modules/components/can-loading/can-loading.service';
import { CanDialogService } from 'src/app/modules/components/can-dialog/can-dialog.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from 'src/app/core/services/util.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  public authError: boolean;
  public isAuthErrorActive: boolean;
  public signinForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private utilService: UtilService,
    private canLoadingService: CanloadingService,
    private canDialog: CanDialogService,
  ) {
    this.signinForm = this.formBuilder.group({
      userName: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * @description Get of userName AbstractControl of signinForm.
   * @returns Returns userName AbstractControl value.
   */
  public get userName(): AbstractControl {
    return this.signinForm.get('userName');
  }

  /**
   * @description Get of password AbtractControl of signinForm.
   * @returns Returns password AbstractControl value.
   */
  public get password(): AbstractControl {
    return this.signinForm.get('password');
  }

  /**
   * @description Verify if form is valid and call action to get public key to encrypt password.
   * @returns Void.
   */
  public login(): void {
    if (this.signinForm.invalid) {
      this.isAuthErrorActive = true;
      return;
    }
    this.authError = false;
    this.getPublickeyRsa();
  }

  /**
   * @description Call service to get public key set user auth data encrypted and next call handleLogin.
   * @returns Void.
   */
  private getPublickeyRsa(): void {
    this.canLoadingService.handleLoad(this.authService.getRsaPublicKey())
      .subscribe((res: HttpRequestResult<any>) => {
        const user = new User({
          userName: this.userName.value,
          password: this.utilService.encryptData(res.data.publicKey, this.password.value)
        } as User);
        this.handleLogin(user);
      }, (error: any) => {
        console.error(error);
      });
  }

  /**
   * @description Receive user data with userName and password encrypted and send a signin request with this data wainting for user token.
   * @param user User model.
   * @returns Void.
   */
  private handleLogin(user: User): void {
    this.canLoadingService.handleLoad(this.authService.signin(user))
      .subscribe((res: HttpRequestResult<Token>) => {
        this.authService.storeCanTokens(res.data);
        this.router.navigate(['can/home']);
      }, (error: HttpErrorResponse) => {
        console.error(error);
        this.canDialog.openDialog('Error', 'Was not possible to complete login.');
        if (error.status === 401) {
          this.authError = true;
          return;
        }
      });
  }
}
