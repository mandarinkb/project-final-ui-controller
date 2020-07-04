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
  token: string;
  formData: SwitchDatabase;
  listSwitchDatabase: SwitchDatabase[];
  constructor(private auth: AuthenService,
              private http: HttpClient,
              private url: UrlService) {}

  readSwitchDatabase() {
    this.token = this.auth.getAuthenticated();
    return this.http.get(this.url.rootUrl + '/switch-database', this.httpOptions());
  }
  readSwitchDatabaseById(id: number) {
    this.token = this.auth.getAuthenticated();
    return this.http.get(this.url.rootUrl + '/switch-database/' + id, this.httpOptions());
  }
  saveSwitchDatabase(form: NgForm) {
    this.token = this.auth.getAuthenticated();
    return this.http.post(this.url.rootUrl + '/switch-database', form, this.httpOptions());
  }
  updateSwitchDatabaseStatus(id: number , formData: any ) {
    this.token = this.auth.getAuthenticated();
    return this.http.put(this.url.rootUrl + '/switch-database-status/' + id , formData, this.httpOptions());
  }
  updateSwitchDatabase(id: number, form: NgForm) {
    this.token = this.auth.getAuthenticated();
    return this.http.put(this.url.rootUrl + '/switch-database/' + id , form, this.httpOptions());
  }
  deleteSwitchDatabase(id: number) {
    this.token = this.auth.getAuthenticated();
    return this.http.delete(this.url.rootUrl + '/switch-database/' + id, this.httpOptions());
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
