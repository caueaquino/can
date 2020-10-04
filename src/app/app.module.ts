import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';

import { AppComponent } from 'src/app/app.component';
import { SigninComponent } from 'src/app/modules/pages/signin/signin.component';
import { SignupComponent } from 'src/app/modules/pages/signup/signup.component';
import { MainLayoutComponent } from 'src/app/modules/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from 'src/app/modules/layouts/auth-layout/auth-layout.component';
import { ChangePasswordComponent } from 'src/app/modules/pages/change-password/change-password.component';
import { RecoverPasswordComponent } from 'src/app/modules/pages/recover-password/recover-password.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    SigninComponent,
    SignupComponent,
    RecoverPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PasswordStrengthMeterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
