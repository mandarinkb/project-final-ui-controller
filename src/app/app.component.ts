import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project-final';
  collapedSideBar: boolean;

  constructor() {
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
}
