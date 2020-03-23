import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './layout/main/main.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ControlComponent } from './pages/control/control.component';
import { UsersComponent } from './pages/users/users.component';
const routes: Routes = [
{ path: '', redirectTo: '/login', pathMatch: 'full' },
// { path: '', redirectTo: '/control', pathMatch: 'full' },
{ path : 'control', component: ControlComponent },
{ path : 'schedule', component: ScheduleComponent },
{ path : 'users', component: UsersComponent },
{ path : 'login', component: LoginComponent }
/*,
{ path : 'login', component: LoginComponent },
{ path : 'register', component: RegisterComponent },
{ path : 'main', component: MainComponent },
{ path : 'forget-password', component: ForgetPasswordComponent },
{ path : 'reset-password', component: ResetPasswordComponent }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
