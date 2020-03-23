import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Schedule } from './schedule.model';
import { NgForm } from '@angular/forms';
import { UrlService } from '../url.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  readonly rootURL = 'http://localhost:8080/api';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  formScheduleData: Schedule;
  listSchedule: Schedule[];
  constructor(private http: HttpClient,
              private rootUrl: UrlService) { }
  readSchedule() {
    return this.http.get(this.rootURL + '/schedule');
  }
  readScheduleById(id: number) {
    return this.http.get(this.rootURL + '/schedule/' + id);
  }
  updateSchedule(id: number, form: NgForm) {
    return this.http.put(this.rootURL + '/schedule/' + id , form);
  }
  restartWebScrapping(form: NgForm) {
    return this.http.post('http://localhost:8081/api/restart-web-scrapping', form);
  }
  saveSchedule(form: NgForm) {
    return this.http.post(this.rootURL + '/schedule', form);
  }
  deleteSchedule(id: number) {
    return this.http.delete(this.rootURL + '/schedule/' + id);
  }
}
