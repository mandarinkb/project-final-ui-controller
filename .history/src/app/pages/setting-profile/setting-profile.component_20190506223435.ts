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
    this.isActiveProfile = true;
    this.isActiveChangePassword = false;
    this.isActiveQuota = false;
    this.isActiveTrashcan = false;
  }
  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

    // โปรไฟล์
    activeProfile() {
      this.isActiveProfile = true;
      this.isActiveChangePassword = false;
      this.isActiveQuota = false;
      this.isActiveTrashcan = false;
    }
    // เปลี่ยนรหัสผ่าน
    activeChangePassword() {
      this.isActiveProfile = false;
      this.isActiveChangePassword = true;
      this.isActiveQuota = false;
      this.isActiveTrashcan = false;
    }
    // พื้นที่ใช้งาน
    activeQuota() {
      this.isActiveProfile = false;
      this.isActiveChangePassword = false;
      this.isActiveQuota = true;
      this.isActiveTrashcan = false;
    }
    // ถังขยะ
    activeTrashcan() {
      this.isActiveProfile = false;
      this.isActiveChangePassword = false;
      this.isActiveQuota = false;
      this.isActiveTrashcan = true;
    }

}
