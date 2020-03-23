import { Component, OnInit } from '@angular/core';
import { ShareFileMemberService } from 'src/app/shared/share-file/share-file-member.service';
import { AuthenService } from 'src/app/shared/authen.service';
import { ShareFileMember } from 'src/app/shared/share-file/share-file-member.model';
import { ShareFileMemberActivity } from 'src/app/shared/share-file/share-file-member-activity.model';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  pgDepartmentMember = 1;
  perPageDepartmentActivity = 5;
  pgDepartmentActivity = 1;
  departmentId: number; // id หน่วยงาน
  constructor(private serviceShareFileMember: ShareFileMemberService,
              private authen: AuthenService) { }

  ngOnInit() {
        // tslint:disable-next-line:radix
        this.departmentId = parseInt(this.authen.getDepartmentId()); // set department id จาก session storage
        this.readDepartment(this.departmentId);
        this.readDepartmentActivity(this.departmentId);
  }
    // เรียกดูสมาชิกภายในหน่วยงานทั้งหมด
    readDepartment(departmentId: number) {
      this.serviceShareFileMember.readMemberDepartment(departmentId).subscribe((res: ShareFileMember[]) => {
          this.serviceShareFileMember.listMemberDepartment = res;
      } , err => {
          console.log(err);
      });
    }
    // เรียกดูกิจกรรมของสมาชิกภายในหน่วยงานทั้งหมด
    readDepartmentActivity(departmentId: number) {
      this.serviceShareFileMember.readDepartmentActivity(departmentId).subscribe((res: ShareFileMemberActivity[]) => {
          this.serviceShareFileMember.listDepartmentActivity = res;
      } , err => {
          console.log(err);
      });
    }
  // per page pagination
  selectOption(id: number) {
    console.log(id);
  }
}
