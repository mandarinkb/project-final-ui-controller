import { Component, OnInit , EventEmitter , Output } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  collapsed: boolean;
  constructor(public login: LoginService) { }

  @Output() collapsedEvent = new EventEmitter<boolean>();

  ngOnInit() {
    this.collapsed = false;
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
  }
}
