import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { FileModel } from './file.model';
import { Observable } from 'rxjs';
// import { RequestOptions, ResponseContentType } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  readonly rootURL = 'http://localhost:8080/api';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  formFileData: FileModel;
  listFile: FileModel[];

  constructor(private http: HttpClient) { }

findByIdFile(id: number) {
  this.http
      .get(this.rootURL + '/upload/' + id)
      .toPromise()
      .then(res => (this.listFile = res as FileModel[]));
}

postUploadFile(file: File , id: number): Observable<HttpEvent<{}>> {
  const formdata: FormData = new FormData();
  formdata.append('files', file);
  const req = new HttpRequest('POST', this.rootURL + '/upload/' + id, formdata, {
    reportProgress: true,
    responseType: 'text'
  });
  return this.http.request(req);
}

postUploadFileSubFolder(file: File , id: number): Observable<HttpEvent<{}>> {
  const formdata: FormData = new FormData();
  formdata.append('files', file);
  const req = new HttpRequest('POST', this.rootURL + '/upload-file-sub-folder/' + id, formdata, {
    reportProgress: true,
    responseType: 'text'
  });
  return this.http.request(req);
}

deleteFile(id: number) {
  return this.http.delete(this.rootURL + '/upload/' + id);
}

downloadFile(id: number) {
  return this.http.get(this.rootURL + '/download/' + id , {responseType: 'blob'});
}

}
