import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  readonly rootUrl = 'http://127.0.0.1:8080/v1'; // http://10.10.10.126:8888/api
  readonly rootUrlRestart = 'http://192.168.1.101:8081/api'; // localhost
  constructor() { }
}
