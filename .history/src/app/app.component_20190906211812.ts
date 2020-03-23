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

  href: String = '';
  constructor(private router: Router) {
    this.href = this.router.url;
    //console.log(this.router.url);
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
}
