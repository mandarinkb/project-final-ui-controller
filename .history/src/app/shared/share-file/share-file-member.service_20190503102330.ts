import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { AuthenService } from '../authen.service';
import { ShareFileMember } from './share-file-member.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareFileMemberService {
  listMemberDepartment: ShareFileMember[];
  token: string;
  updUser: string;
  readonly rootURL = 'http://localhost:8080/api';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient ,
              private authen: AuthenService) {
              this.token = '?token=' + this.authen.getAuthenticated();
              this.updUser = '&updUser=' + this.authen.getUsername();
  }

  // เรียกดูสมาชิกของหน่วยงาน
  readMemberDepartment(departmentId: number) {
          return this.http.get(this.rootURL + '/department-member/' + departmentId + this.token);
  }

  postUploadFile(file: File , id: number): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('files', file);
    const req = new HttpRequest('POST', this.rootURL + '/share-file-upload/' + id +
                                '?type=folder&token=' + this.authen.getAuthenticated(), formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  postUploadFileSubFolder(file: File , id: number): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('files', file);
    // tslint:disable-next-line:max-line-length
    const req = new HttpRequest('POST', this.rootURL + '/share-file-upload/' + id +
                                '?type=subfolder&token=' + this.authen.getAuthenticated(), formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  deleteFile(id: number) {
    return this.http.delete(this.rootURL + '/share-file-delete-file/' + id + this.token + this.updUser );
  }

  downloadFile(id: number) {
    return this.http.get(this.rootURL + '/share-file-download/' + id + this.token , {responseType: 'blob'});
  }
}
