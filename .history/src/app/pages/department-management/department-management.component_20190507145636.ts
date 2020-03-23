import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrls: ['./department-management.component.scss']
})
export class DepartmentManagementComponent implements OnInit {
  collapedSideBar: boolean;
  constructor() { }

  ngOnInit() {
  }
  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
}
