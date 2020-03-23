import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-profile',
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.scss']
})
export class SettingProfileComponent implements OnInit {
  collapedSideBar: boolean;
  constructor() { }

  ngOnInit() {
  }
  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
}
