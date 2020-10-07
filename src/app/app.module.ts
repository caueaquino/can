import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';

import { AppComponent } from 'src/app/app.component';
import { HomeComponent } from 'src/app/modules/pages/home/home.component';
import { JobsComponent } from 'src/app/modules/pages/jobs/jobs.component';
import { SigninComponent } from 'src/app/modules/pages/signin/signin.component';
import { SignupComponent } from 'src/app/modules/pages/signup/signup.component';
import { ProfileComponent } from 'src/app/modules/pages/profile/profile.component';
import { MainLayoutComponent } from 'src/app/modules/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from 'src/app/modules/layouts/auth-layout/auth-layout.component';
import { CanDialogComponent } from 'src/app/modules/components/can-dialog/can-dialog.component';
import { CanLoadingComponent } from 'src/app/modules/components/can-loading/can-loading.component';
import { RecoverPasswordComponent } from 'src/app/modules/pages/recover-password/recover-password.component';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';
import { ErrorInterceptor } from 'src/app/core/interceptors/error.interceptor';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { VideosComponent } from './modules/pages/videos/videos.component';


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
    CanDialogComponent,
    ProfileComponent,
    JobsComponent,
    VideosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    PasswordStrengthMeterModule,
    BrowserAnimationsModule,
  ],
  providers:  [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
