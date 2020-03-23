import { Component, OnInit , EventEmitter , Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  collapsed: boolean;
  showMenu: string;
  constructor() { }

  @Output() collapsedEvent = new EventEmitter<boolean>();

  ngOnInit() {
    this.collapsed = false;
    this.showMenu = '';
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
}
}
