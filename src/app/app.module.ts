import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MaterialModule } from './material/material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './layout/main/main.component';
import { ConfirmPasswordValidatorService } from './shared/confirm-password-validator.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FooterComponent } from './layout/footer/footer.component';
import { ChartsModule } from 'ng2-charts';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ControlComponent } from './pages/control/control.component';
// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { UsersComponent } from './pages/users/users.component';
import { SwitchDatabaseComponent } from './pages/switch-database/switch-database.component';
import { NewScheduleComponent } from './pages/new-schedule/new-schedule.component';
import { LogComponent } from './pages/log/log.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ConfirmDialogComponent,
    LoginComponent,
    MainComponent,
    ConfirmPasswordValidatorService,
    FooterComponent,
    ScheduleComponent,
    ControlComponent,
    UsersComponent,
    SwitchDatabaseComponent,
    NewScheduleComponent,
    LogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    PdfViewerModule,
    ChartsModule,
    // for HttpClient use:
    LoadingBarHttpClientModule,
    // for Router use:
    LoadingBarRouterModule,
    // for Core use:
    LoadingBarModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent]

})
export class AppModule {}

