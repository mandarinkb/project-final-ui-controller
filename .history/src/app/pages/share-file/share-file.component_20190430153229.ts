import { Component, OnInit } from '@angular/core';
import { AuthenService } from 'src/app/shared/authen.service';
import { ShareFileMemberService } from 'src/app/shared/share-file/share-file-member.service';
import { ShareFileMember } from 'src/app/shared/share-file/share-file-member.model';

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

  departmentId: number;
  constructor(private service: ShareFileMemberService,
              private authen: AuthenService) { }

  ngOnInit() {
    this.isActiveDepartment = true; // สมาชิก
    this.isActiveShareFile = false; // ไฟล์ที่ใช้ร่วมกัน
    // tslint:disable-next-line:radix
    this.departmentId = parseInt(this.authen.getDepartmentId());
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

  readDepartment(departmentId: number) {
    this.service.readMemberDepartment(departmentId).subscribe((res: ShareFileMember[]) => {
        this.service.listMemberDepartment = res;
    } , err => {
        console.log(err);
    });
  }

}
