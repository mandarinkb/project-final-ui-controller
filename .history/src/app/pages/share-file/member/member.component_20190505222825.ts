import { Component, OnInit } from '@angular/core';
import { ShareFileMemberService } from 'src/app/shared/share-file/share-file-member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  pgDepartmentMember = 1;
  perPageDepartmentActivity = 5;
  pgDepartmentActivity = 1;
  constructor(private serviceShareFileMember: ShareFileMemberService) { }

  ngOnInit() {
  }
  // per page pagination
  selectOption(id: number) {
    console.log(id);
  }
}
