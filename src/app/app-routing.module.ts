import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoCenterComponent } from './video-center/video-center.component';
import{LoginComponent} from './login/login.component';
import{ProfileComponent} from './profile/profile.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component'

const routes: Routes = [

  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent},
  {path:'home',component:HomeComponent},
  {path:'videos',component:VideoCenterComponent},
  {path:'forgot_password',component:ForgotPasswordComponent},
  {path:'reset_password',component:ResetPasswordComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
