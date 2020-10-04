import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from 'src/app/modules/pages/signup/signup.component';
import { SigninComponent } from 'src/app/modules/pages/signin/signin.component';
import { AuthLayoutComponent } from 'src/app/modules/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from 'src/app/modules/layouts/main-layout/main-layout.component';
import { ChangePasswordComponent } from 'src/app/modules/pages/change-password/change-password.component';
import { RecoverPasswordComponent } from 'src/app/modules/pages/recover-password/recover-password.component';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },

      { path: 'signin', component: SigninComponent },

      { path: 'signup', component: SignupComponent },

      { path: 'change-password', component: ChangePasswordComponent },

      { path: 'recover-password', component: RecoverPasswordComponent },
    ],
  },
  {
    path: 'can', component: MainLayoutComponent, children: [

    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
