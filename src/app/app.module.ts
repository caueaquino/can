import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';

import { AppComponent } from 'src/app/app.component';
import { HomeComponent } from 'src/app/modules/pages/home/home.component';
import { SigninComponent } from 'src/app/modules/pages/signin/signin.component';
import { SignupComponent } from 'src/app/modules/pages/signup/signup.component';
import { MainLayoutComponent } from 'src/app/modules/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from 'src/app/modules/layouts/auth-layout/auth-layout.component';
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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    PasswordStrengthMeterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
