import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/shared/models/user.model';
import { Token } from 'src/app/shared/models/token.model';
import { HttpRequestResult } from 'src/app/shared/models/http-request-result.model';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  public signinForm: FormGroup;
  public isAuthErrorActive: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.signinForm = this.formBuilder.group({
      userName: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  public get username(): AbstractControl {
    return this.signinForm.get('userName');
  }

  public get password(): AbstractControl {
    return this.signinForm.get('password');
  }

  public doLogin(): void {
    if (this.signinForm.invalid) {
      this.isAuthErrorActive = true;
      return;
    }
    this.authService.login()
    .subscribe((res: HttpRequestResult<Token>) => {
      console.log(res);
      const authUser = this.signinForm.getRawValue() as User;
      alert(`${authUser.userName} - Logou com sucesso!`);
    }, (error: HttpErrorResponse) => {
      console.error(error);
    });
  }

}
