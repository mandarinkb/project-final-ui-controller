import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Schedule } from './schedule.model';
import { NgForm } from '@angular/forms';
import { UrlService } from '../url.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  // readonly rootURL = 'http://localhost:8080/api';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  formScheduleData: Schedule;
  listSchedule: Schedule[];
  constructor(private http: HttpClient,
              private url: UrlService) { }
  readSchedule() {
    return this.http.get(this.url.rootUrl + '/schedule');
  }
  readScheduleById(id: number) {
    return this.http.get(this.url.rootUrl + '/schedule/' + id);
  }
  updateSchedule(id: number, form: NgForm) {
    return this.http.put(this.url.rootUrl + '/schedule/' + id , form);
  }
  restartWebScrapping(form: NgForm) {
    return this.http.post(this.url.rootUrlRestart + '/restart-web-scrapping', form);
  }
  saveSchedule(form: NgForm) {
    return this.http.post(this.url.rootUrl + '/schedule', form);
  }
  deleteSchedule(id: number) {
    return this.http.delete(this.url.rootUrl + '/schedule/' + id);
  }
}
