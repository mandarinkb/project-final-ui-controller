import { Component, OnInit, Input } from '@angular/core';
import { AuthenService } from 'src/app/shared/authen.service';

@Component({
  selector: 'app-share-file',
  templateUrl: './share-file.component.html',
  styleUrls: ['./share-file.component.scss']
})
export class ShareFileComponent implements OnInit {
  @Input() departmentName: string;
  isActiveDepartment: boolean; // สมาชิก
  isActiveShareFile: boolean; // ไฟล์ที่ใช้ร่วมกัน
  collapedSideBar: boolean;

  constructor(private authen: AuthenService) { }

  ngOnInit() {
    this.isActiveDepartment = true; // สมาชิก
    this.isActiveShareFile = false; // ไฟล์ที่ใช้ร่วมกัน
    this.departmentName = this.authen.getDepartmentName();
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  // สมาชิก
  activeDepartment() {
    this.isActiveShareFile = false;
    this.isActiveDepartment = true;
  }

  // ไฟล์ที่ใช้ร่วมกัน
  activeShareFile() {
    this.isActiveDepartment = false;
    this.isActiveShareFile = true;
  }

}
