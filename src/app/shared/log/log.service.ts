import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlService } from '../url.service';
import { Log } from './log.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  listLog: Log[];
  constructor(private http: HttpClient,
              private url: UrlService) { }

  readLog(timestamp: any) {
    return this.http.post(this.url.rootUrl + '/log', timestamp);
  }
}
