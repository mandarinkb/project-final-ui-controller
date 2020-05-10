import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ControlComponent } from './pages/control/control.component';
import { UsersComponent } from './pages/users/users.component';
import { SwitchDatabaseComponent } from './pages/switch-database/switch-database.component';
import { NewScheduleComponent } from './pages/new-schedule/new-schedule.component';
const routes: Routes = [
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path : 'control', component: ControlComponent },
{ path : 'schedule', component: ScheduleComponent },
{ path : 'new-schedule', component: NewScheduleComponent },
{ path : 'users', component: UsersComponent },
{ path : 'login', component: LoginComponent },
{ path : 'switch-database', component: SwitchDatabaseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
