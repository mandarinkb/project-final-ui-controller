import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenService } from '../authen.service';
import { ShareFileMember } from './share-file-member.model';

@Injectable({
  providedIn: 'root'
})
export class ShareFileMemberService {
  listMemberDepartment: ShareFileMember[];
  token: string;
  readonly rootURL = 'http://localhost:8080/api';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient ,
              private authen: AuthenService) {
              this.token = '?token=' + this.authen.getAuthenticated();
  }

  // เรียกดูสมาชิกของหน่วยงาน
  readMemberDepartment(departmentId: number) {
          return this.http.get(this.rootURL + '/department-member/' + departmentId + this.token);
  }
}
