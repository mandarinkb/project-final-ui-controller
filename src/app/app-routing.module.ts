import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ControlComponent } from './pages/control/control.component';
import { UsersComponent } from './pages/users/users.component';
import { SwitchDatabaseComponent } from './pages/switch-database/switch-database.component';
import { NewScheduleComponent } from './pages/new-schedule/new-schedule.component';
import { AuthGuardService } from './shared/auth-guard.service';
const routes: Routes = [
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path : 'control', component: ControlComponent, canActivate: [AuthGuardService]},
{ path : 'schedule', component: ScheduleComponent, canActivate: [AuthGuardService]},
{ path : 'new-schedule', component: NewScheduleComponent, canActivate: [AuthGuardService]},
{ path : 'users', component: UsersComponent, canActivate: [AuthGuardService]},
{ path : 'login', component: LoginComponent },
{ path : 'switch-database', component: SwitchDatabaseComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
