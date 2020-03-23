import { Component, OnInit } from '@angular/core';
import { ShareFileMemberService } from 'src/app/shared/share-file/share-file-member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  constructor(private serviceShareFileMember: ShareFileMemberService) { }

  ngOnInit() {
  }

}
