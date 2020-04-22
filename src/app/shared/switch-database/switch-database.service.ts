import { Injectable, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenService } from '../authen.service';
import { UrlService } from '../url.service';
import { NgForm } from '@angular/forms';
import { SwitchDatabase } from './switch-database.model';
@Injectable({
  providedIn: 'root'
})
export class SwitchDatabaseService {
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth.getAuthenticated()
    })
  };

  formData: SwitchDatabase;
  listSwitchDatabase: SwitchDatabase[];
  constructor(private auth: AuthenService,
              private http: HttpClient,
              private url: UrlService) {

  }

  readSwitchDatabase() {
    return this.http.get(this.url.rootUrl + '/switch-database', this.httpOptions);
  }
  readSwitchDatabaseById(id: number) {
    return this.http.get(this.url.rootUrl + '/switch-database/' + id, this.httpOptions);
  }
  /*updateSwitchDatabaseStatus(id: number , formData: any ) {
    return this.http.put(this.url.rootUrl + '/web-status/' + id , formData, this.httpOptions);
  }*/
  saveSwitchDatabase(form: NgForm) {
    return this.http.post(this.url.rootUrl + '/switch-database', form, this.httpOptions);
  }

  updateSwitchDatabase(id: number, form: NgForm) {
    return this.http.put(this.url.rootUrl + '/switch-database/' + id , form, this.httpOptions);
  }

  deleteSwitchDatabase(id: number) {
    return this.http.delete(this.url.rootUrl + '/switch-database/' + id, this.httpOptions);
  }
}
