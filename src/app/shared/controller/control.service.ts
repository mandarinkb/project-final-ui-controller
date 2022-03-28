import { Injectable, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Web } from './web.model';
import { NgForm } from '@angular/forms';
import { UrlService } from '../url.service';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  formData: Web;
  lisWeb: Web[];
  constructor(private http: HttpClient,
              private url: UrlService) {}

  getWeb() {
    return this.http.get(this.url.rootUrl + '/web'); // , this.httpOptions()
  }
  readWebById(id: number) {
    return this.http.get(this.url.rootUrl + '/web/' + id);
  }
  updateWebStatus(formData: any ) {
    return this.http.put(this.url.rootUrl + '/web-status', formData);
  }
  saveWeb(form: NgForm) {
    return this.http.post(this.url.rootUrl + '/web', form);
  }
  updateWeb( form: NgForm) {
    return this.http.put(this.url.rootUrl + '/web'  , form);
  }
  deleteWeb(id: number) {
    return this.http.delete(this.url.rootUrl + '/web/' + id);
  }

}
