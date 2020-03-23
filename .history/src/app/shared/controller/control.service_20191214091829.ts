import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Web } from './web.model';
import { NgForm } from '@angular/forms';
import { UrlService } from '../url.service';
import { AuthenService } from '../authen.service';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }).set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHQuY29tIiwicm9sZSI6InVzZXIiLCJleHAiOjE1NzYzMDc2MDEsImlhdCI6MTU3NjI4OTYwMX0.RdGDmT0-YuBI3hp0AhM-00EsFJI_8NebISNjWMFSfmvlSZiWMD_xGzGw01sSJhpskLCZhKQbwge5UkicZhruGg')
  };
  formData: Web;
  lisWeb: Web[];
  constructor(private http: HttpClient,
              private url: UrlService,
              private auth: AuthenService) {console.log(this.auth.getAuthenticated()); }

  getWeb() {
    return this.http.get(this.url.rootUrl + '/web', this.httpOptions);
  }
  readWebById(id: number) {
    return this.http.get(this.url.rootUrl + '/web/' + id, this.httpOptions);
  }
  updateWebStatus(id: number , formData: any ) {
    return this.http.put(this.url.rootUrl + '/web-status/' + id , formData, this.httpOptions);
  }
  saveWeb(form: NgForm) {
    return this.http.post(this.url.rootUrl + '/web', form, this.httpOptions);
  }

  updateWeb(id: number, form: NgForm) {
    return this.http.put(this.url.rootUrl + '/web/' + id , form, this.httpOptions);
  }

  deleteWeb(id: number) {
    return this.http.delete(this.url.rootUrl + '/web/' + id, this.httpOptions);
  }
}
