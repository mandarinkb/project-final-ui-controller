import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-file',
  templateUrl: './share-file.component.html',
  styleUrls: ['./share-file.component.scss']
})
export class ShareFileComponent implements OnInit {
  isActiveDepartment: boolean; // สมาชิก
  isActiveShareFile: boolean; // ไฟล์ที่ใช้ร่วมกัน
  collapedSideBar: boolean;
  pgDepartment = 1;
  constructor() { }

  ngOnInit() {
    this.isActiveDepartment = false;
    this.isActiveShareFile = false;
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  // สมาชิก
  activeDepartment() {
    this.isActiveShareFile = false;
    this.isActiveDepartment = true;
  }

  activeShareFile() {
    this.isActiveDepartment = false;
    this.isActiveShareFile = true;
  }


}
