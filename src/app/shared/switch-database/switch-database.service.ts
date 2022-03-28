import { Injectable, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UrlService } from '../url.service';
import { NgForm } from '@angular/forms';
import { SwitchDatabase } from './switch-database.model';
@Injectable({
  providedIn: 'root'
})
export class SwitchDatabaseService {
  formData: SwitchDatabase;
  listSwitchDatabase: SwitchDatabase[];
  constructor(private http: HttpClient,
              private url: UrlService) {}

  readSwitchDatabase() {
    return this.http.get(this.url.rootUrl + '/switch-database');
  }
  readSwitchDatabaseById(id: number) {
    return this.http.get(this.url.rootUrl + '/switch-database/' + id);
  }
  saveSwitchDatabase(form: NgForm) {
    return this.http.post(this.url.rootUrl + '/switch-database', form);
  }
  updateSwitchDatabaseStatus(formData: any ) {
    return this.http.put(this.url.rootUrl + '/switch-database-status', formData);
  }
  updateSwitchDatabase(form: NgForm) {
    return this.http.put(this.url.rootUrl + '/switch-database' , form);
  }
  deleteSwitchDatabase(id: number) {
    return this.http.delete(this.url.rootUrl + '/switch-database/' + id);
  }
}
