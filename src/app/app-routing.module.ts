import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AccountGuard } from 'src/app/core/guards/account.guard';
import { HomeComponent } from 'src/app/modules/pages/home/home.component';
import { SignupComponent } from 'src/app/modules/pages/signup/signup.component';
import { SigninComponent } from 'src/app/modules/pages/signin/signin.component';
import { VideosComponent } from 'src/app/modules/pages/videos/videos.component';
import { ProfileComponent } from 'src/app/modules/pages/profile/profile.component';
import { AuthLayoutComponent } from 'src/app/modules/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from 'src/app/modules/layouts/main-layout/main-layout.component';
import { RecoverPasswordComponent } from 'src/app/modules/pages/recover-password/recover-password.component';


const routes: Routes = [
  {
    path: 'auth', component: AuthLayoutComponent, canActivate: [AccountGuard],
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },

      { path: 'signin', component: SigninComponent },

      { path: 'signup', component: SignupComponent },

      { path: 'recover-password', component: RecoverPasswordComponent },
    ],
  },
  {
    path: 'can', component: MainLayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      { path: 'home', component: HomeComponent },

      { path: 'videos', component: VideosComponent },

      { path: 'profile/:id', component: ProfileComponent },
    ],
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
