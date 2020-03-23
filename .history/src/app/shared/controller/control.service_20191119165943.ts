import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Web } from './web.model';
import { NgForm } from '@angular/forms';
import { UrlService } from '../url.service';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  formData: Web;
  lisWeb: Web[];
  constructor(private http: HttpClient,
              private rootUrl: UrlService) { }

  getWeb() {
    return this.http.get(this.rootUrl.rootUrl + '/web');
  }
  readWebById(id: number) {
    return this.http.get(this.rootUrl.rootUrl + '/web/' + id);
  }
  updateWebStatus(id: number , formData: any ) {
    return this.http.put(this.rootUrl.rootUrl + '/web-status/' + id , formData);
  }
  saveWeb(form: NgForm) {
    return this.http.post(this.rootUrl.rootUrl + '/web', form);
  }

  updateWeb(id: number, form: NgForm) {
    return this.http.put(this.rootUrl.rootUrl + '/web/' + id , form);
  }

  deleteWeb(id: number) {
    return this.http.delete(this.rootUrl.rootUrl + '/web/' + id);
  }
}
