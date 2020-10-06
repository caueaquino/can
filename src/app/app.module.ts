import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';

import { AppComponent } from 'src/app/app.component';
import { HomeComponent } from 'src/app/modules/pages/home/home.component';
import { SigninComponent } from 'src/app/modules/pages/signin/signin.component';
import { SignupComponent } from 'src/app/modules/pages/signup/signup.component';
import { MainLayoutComponent } from 'src/app/modules/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from 'src/app/modules/layouts/auth-layout/auth-layout.component';
import { RecoverPasswordComponent } from 'src/app/modules/pages/recover-password/recover-password.component';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CanLoadingComponent } from './modules/components/can-loading/can-loading.component';
import { CanDialogComponent } from './modules/components/can-dialog/can-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    SigninComponent,
    SignupComponent,
    RecoverPasswordComponent,
    HomeComponent,
    CanLoadingComponent,
    CanDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    PasswordStrengthMeterModule,
  ],
  providers:  [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
