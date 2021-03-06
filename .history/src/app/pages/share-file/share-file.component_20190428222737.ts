import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-file',
  templateUrl: './share-file.component.html',
  styleUrls: ['./share-file.component.scss']
})
export class ShareFileComponent implements OnInit {
  isActiveDepartment: boolean;
  isActiveDepartmentActivity: boolean;
  collapedSideBar: boolean;
  pgDepartment = 1;
  constructor() { }

  ngOnInit() {
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

}
