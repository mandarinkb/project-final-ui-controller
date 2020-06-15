import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlService } from '../url.service';
import { AuthenService } from '../authen.service';
import { Log } from './log.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth.getAuthenticated()
    })
  };

  listLog: Log[];
  constructor(private http: HttpClient,
              private url: UrlService,
              private auth: AuthenService) { }

  readLog(timestamp: any) {
    return this.http.post(this.url.rootUrl + '/log', timestamp, this.httpOptions);
  }
}
