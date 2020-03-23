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
  constructor() { }

  ngOnInit() {

  }

}
