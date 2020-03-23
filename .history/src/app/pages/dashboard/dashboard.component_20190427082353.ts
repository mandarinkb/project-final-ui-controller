import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from 'src/app/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [SidebarComponent]
})
export class DashboardComponent implements OnInit {
  collapedSideBar: boolean;
  constructor(private sidebarComponent: SidebarComponent) {
    console.log('DashboardComponent : ' + this.sidebarComponent.showMenu);
  }

  ngOnInit() {
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
}
