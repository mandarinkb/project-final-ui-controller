import { Injectable } from '@angular/core';
import { Folder } from './folder.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subfolder } from './subfolder.model';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { MyFileMainFolder } from './my-file-main-folder.model';
import { MyFileSubFolder } from './my-file-sub-folder.model';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  readonly rootURL = 'http://localhost:8080/api';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  formData: Folder;
  formSubFolder: Subfolder;
  // list: Folder[];
  list: MyFileMainFolder[];
  listSubFolder: MyFileSubFolder[];
  constructor(private http: HttpClient) {}
  // create
  postMainFolder(formData: Folder, id: number) {
   return this.http.post(this.rootURL + '/folder/' + id, formData, this.httpOptions);
  }
  // read
  refreshMainFolder(id: number) {
  /*this.http
      .get(this.rootURL + '/my-file/' + id)
      .toPromise()
      .then(res => (this.list = res as Folder[]));
      */
      return this.http.get(this.rootURL + '/folder/' + id);
  }

  // แก้ไขโฟเดอร์ (ใช้ได้ทั้ง mainfolder และ subfolder)
  editFolder(id: number) {
    return this.http.get(this.rootURL + '/find-by-folder-id/' + id);
  }

  // update
  putMainFolder(formData: Folder , id: number) {
    return this.http.put(this.rootURL + '/folder/' + id, formData);
  }
  // delete
  deleteMainFolder(id: number) {
    return this.http.delete(this.rootURL + '/folder/' + id);
  }


  // sub folder
  // read
  /*refreshSubFolder(id: number) { // แก้แล้ว
    this.http
      .get(this.rootURL + '/find-sub-folder-and-file/' + id)
      .toPromise()
      .then(res => (this.listSubFolder = res as MyFileSubFolder[]));
  }
  */
  refreshSubFolder(id: number) {
      return this.http.get(this.rootURL + '/find-sub-folder-and-file/' + id);
  }


  // แก้ไขโฟเดอร์
 /* findByIdSubFolder(id: number) {
    return this.http.get(this.rootURL + '/find-by-folder-id/' + id);
  }*/
  // create
  postSubFolder(formSubFolder: Subfolder) {  // แก้แล้ว
    return this.http.post(
      this.rootURL + '/sub-folder',
      formSubFolder,
      this.httpOptions
    );
  }
  // update
  putSubFolder(formSubFolder: Subfolder , id: number) {  // แก้แล้ว
    return this.http.put(this.rootURL + '/folder/' + id, formSubFolder);
  }
  // delete
  deleteSubFolder(id: number) {
    return this.http.delete(this.rootURL + '/folder/' + id);
  }

}
