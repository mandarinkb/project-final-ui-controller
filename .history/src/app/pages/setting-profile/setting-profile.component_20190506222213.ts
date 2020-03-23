import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-profile',
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.scss']
})
export class SettingProfileComponent implements OnInit {
  collapedSideBar: boolean;

  isActiveProfile: boolean; // โปรไฟล์
  isActiveChangePassword: boolean; // เปลี่ยนรหัสผ่าน
  isActiveQuota: boolean; // พื้นที่ใช้งาน
  isActiveTrashcan: boolean; // ถังขยะ
  constructor() { }

  ngOnInit() {
  }
  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

    // สมาชิก
    activeDepartment() {
      this.isActiveProfile = false;
      this.isActiveChangePassword = true;
    }
}
