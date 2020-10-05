import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'src/app/modules/pages/home/home.component';
import { SignupComponent } from 'src/app/modules/pages/signup/signup.component';
import { SigninComponent } from 'src/app/modules/pages/signin/signin.component';
import { AuthLayoutComponent } from 'src/app/modules/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from 'src/app/modules/layouts/main-layout/main-layout.component';
import { RecoverPasswordComponent } from 'src/app/modules/pages/recover-password/recover-password.component';


const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children:
      [
        { path: '', redirectTo: 'signin', pathMatch: 'full' },

        { path: 'signin', component: SigninComponent },

        { path: 'signup', component: SignupComponent },

        { path: 'recover-password', component: RecoverPasswordComponent },
      ],
  },
  {
    path: 'can', component: MainLayoutComponent, children:
      [
        { path: '', redirectTo: 'home', pathMatch: 'full' },

        { path: 'home', component: HomeComponent },
      ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
