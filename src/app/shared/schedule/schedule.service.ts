import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Schedule } from './schedule.model';
import { NgForm } from '@angular/forms';
import { UrlService } from '../url.service';
import { AuthenService } from '../authen.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  token: string;
  formScheduleData: Schedule;
  listSchedule: Schedule[];
  constructor(private http: HttpClient,
              private url: UrlService,
              private auth: AuthenService) {}
  readSchedule() {
    this.token = this.auth.getAuthenticated();
    return this.http.get(this.url.rootUrl + '/schedule');
  }
  readScheduleById(id: number) {
    this.token = this.auth.getAuthenticated();
    return this.http.get(this.url.rootUrl + '/schedule/' + id);
  }
  updateSchedule(form: NgForm) {
    this.token = this.auth.getAuthenticated();
    return this.http.put(this.url.rootUrl + '/schedule' , form);
  }
  restartWebScrapping(form: NgForm) {
    this.token = this.auth.getAuthenticated();
    return this.http.post(this.url.rootUrlRestart + '/restart', form);
  }
  saveSchedule(form: NgForm) {
    this.token = this.auth.getAuthenticated();
    return this.http.post(this.url.rootUrl + '/schedule', form);
  }
  deleteSchedule(id: number) {
    this.token = this.auth.getAuthenticated();
    return this.http.delete(this.url.rootUrl + '/schedule/' + id);
  }

  // httpOptions() {
  //   return {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + this.token
  //     })
  //   };
  // }
}
