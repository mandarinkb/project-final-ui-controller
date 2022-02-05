import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ControlComponent } from './pages/control/control.component';
import { UsersComponent } from './pages/users/users.component';
import { SwitchDatabaseComponent } from './pages/switch-database/switch-database.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { LogComponent } from './pages/log/log.component';
const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path : 'control', component: ControlComponent, canActivate: [AuthGuardService]},
{ path : 'schedule', component: ScheduleComponent, canActivate: [AuthGuardService]},
{ path : 'users', component: UsersComponent, canActivate: [AuthGuardService]},
{ path : 'login', component: LoginComponent },
{ path : 'switch-database', component: SwitchDatabaseComponent, canActivate: [AuthGuardService]},
{ path : 'log', component: LogComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    // ตัดตัวท้าย
    const pathUrl = window.location.pathname.split('/');
    const pathName = pathUrl[pathUrl.length - 1 ];
    console.log(pathName);
    let isInRoute = false;
    for (const obj of routes) {
      const pathInRoute = Object.values(obj)[0];
      if (pathInRoute !== '') {
        if (pathName === pathInRoute) {
          isInRoute = true;
        }
      }
    }
    if (!isInRoute) {
      this.router.navigate(['/login']);
    }
  }
}
