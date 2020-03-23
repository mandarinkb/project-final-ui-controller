import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { AuthenService } from '../authen.service';
import { ShareFileMember } from './share-file-member.model';
import { Observable } from 'rxjs';
import { Folder } from '../folder.model';
import { Subfolder } from '../subfolder.model';
import { FileModel } from '../file.model';
import { MyFileMainFolder } from '../my-file-main-folder.model';
import { MyFileSubFolder } from '../my-file-sub-folder.model';

@Injectable({
  providedIn: 'root'
})
export class ShareFileMemberService {
  listMemberDepartment: ShareFileMember[];
  token: string;
  updUser: string;
  memberId: string;
  readonly rootURL = 'http://localhost:8080/api';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  formFileData: FileModel;
  listFile: FileModel[];
  formData: Folder;
  formSubFolder: Subfolder;
  list: MyFileMainFolder[];
  listSubFolder: MyFileSubFolder[];

  constructor(private http: HttpClient ,
              private authen: AuthenService) {
              this.token = '?token=' + this.authen.getAuthenticated();
              this.updUser = '&updUser=' + this.authen.getUsername();
              this.memberId = this.authen.getId();
  }

  // เรียกดูสมาชิกของหน่วยงาน
  readMemberDepartment(departmentId: number) {
          return this.http.get(this.rootURL + '/department-member/' + departmentId + this.token);
  }

  // อัพโหลดไฟล์ (แก้แล้ว)
  postUploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('files', file);
    const req = new HttpRequest('POST', this.rootURL + '/share-file-upload/' + this.memberId +
                                '?type=folder&token=' + this.authen.getAuthenticated(), formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  // อัพโหลดไฟล์ subfolder (แก้แล้ว)
  postUploadFileSubFolder(file: File , subFolderId: number): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('files', file);
    // tslint:disable-next-line:max-line-length
    const req = new HttpRequest('POST', this.rootURL + '/share-file-upload/' + this.memberId +
                                '?type=subfolder&token=' + this.authen.getAuthenticated() + '&subFolderId=' + subFolderId, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  // ลบไฟล์ (เปลี่ยนสถานะเป็น I) (ใช้ได้ทั้ง folder และ subfolder) (แก้แล้ว)
  deleteFile(id: number) {
    return this.http.delete(this.rootURL + '/share-file-delete-file/' + id + this.token + this.updUser );
  }

  // ดาวน์โหลดไฟล์ (ใช้ได้ทั้ง folder และ subfolder) (แก้แล้ว)
  downloadFile(id: number) {
    return this.http.get(this.rootURL + '/share-file-download/' + id + this.token , {responseType: 'blob'});
  }




   // create สร้าง folder
   createFolder(formData: Folder, memberId: number) {
    return this.http.post(this.rootURL + '/share-file-folder/' + memberId + this.token, formData, this.httpOptions);
   }

   // read แสดง folder และ file
   readFolder(departmentId: number) {
       return this.http.get(this.rootURL + '/share-file-folder-file/' + departmentId + this.token);
   }

   // แก้ไขโฟเดอร์ (ใช้ได้ทั้ง folder และ subfolder)
   editFolder(folderId: number) {
     return this.http.get(this.rootURL + '/share-file-folder/' + folderId + this.token);
   }

   // update อัพเดต folder และใช้ id ของ user ไปค้นหาชื่อคนที่อัพเดตโฟเดอร์
   updateFolder(formData: Folder , memberId: number) {
     return this.http.put(this.rootURL + '/share-file-folder/' + memberId + this.token, formData);
   }
   // delete ลบ folder (ใช้ได้ทั้ง folder และ subfolder) (เปลี่ยนสถานะเป็น I)
   deleteFolder(id: number) {
     return this.http.delete(this.rootURL + '/share-file-folder/' + id + this.token + this.updUser );
   }

   // read แสดง subfolder และ file
   readSubFolder(subfolderId: number) {
       return this.http.get(this.rootURL + '/share-file-subfolder-file/' + subfolderId + this.token);
   }

   // create สร้าง subfolder โดยเซ็ท subfolder id มาแล้วผ่าน[(ngModel)]ของ form
   createSubFolder(formSubFolder: Subfolder) {
     return this.http.post(this.rootURL + '/share-file-subfolder' + this.token, formSubFolder, this.httpOptions);
   }

   // update อัพเดต subfolder และใช้ id ของ user ไปค้นหาชื่อคนที่อัพเดตโฟเดอร์
   updateSubFolder(formSubFolder: Subfolder , memberId: number) {
     return this.http.put(this.rootURL + '/share-file-folder/' + memberId + this.token, formSubFolder);
   }

}
