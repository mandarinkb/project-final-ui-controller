import { Injectable, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Web } from './web.model';
import { NgForm } from '@angular/forms';
import { UrlService } from '../url.service';
import { AuthenService } from '../authen.service';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  token: string;

  formData: Web;
  lisWeb: Web[];
  constructor(private http: HttpClient,
              private url: UrlService,
              private auth: AuthenService) {}

  getWeb() {
    this.token = this.auth.getAuthenticated();
    return this.http.get(this.url.rootUrl + '/web', this.httpOptions());
  }
  readWebById(id: number) {
    this.token = this.auth.getAuthenticated();
    return this.http.get(this.url.rootUrl + '/web/' + id, this.httpOptions());
  }
  updateWebStatus(id: number , formData: any ) {
    this.token = this.auth.getAuthenticated();
    return this.http.put(this.url.rootUrl + '/web-status/' + id , formData, this.httpOptions());
  }
  saveWeb(form: NgForm) {
    this.token = this.auth.getAuthenticated();
    return this.http.post(this.url.rootUrl + '/web', form, this.httpOptions());
  }
  updateWeb(id: number, form: NgForm) {
    this.token = this.auth.getAuthenticated();
    return this.http.put(this.url.rootUrl + '/web/' + id , form, this.httpOptions());
  }
  deleteWeb(id: number) {
    this.token = this.auth.getAuthenticated();
    return this.http.delete(this.url.rootUrl + '/web/' + id, this.httpOptions());
  }
  httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
  }
}
