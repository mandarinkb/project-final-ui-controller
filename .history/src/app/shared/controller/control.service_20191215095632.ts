import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Web } from './web.model';
import { NgForm } from '@angular/forms';
import { UrlService } from '../url.service';
import { AuthenService } from '../authen.service';
// import { Http, Headers, RequestOptions} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth.getAuthenticated()
    })
  };

  formData: Web;
  lisWeb: Web[];
  constructor(private http: HttpClient,
              private url: UrlService,
              private auth: AuthenService) {
    console.log(this.auth.getAuthenticated());
  }

  private appHeader(token) {
    const headers = {};
    if (token) { headers['Authorization'] = 'Bearer ' + token; }
    return new HttpHeaders(headers);
  }

  getWeb() {
    return this.http.get(this.url.rootUrl + '/web', {
      headers: this.appHeader(this.auth.getAuthenticated())
    });
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
