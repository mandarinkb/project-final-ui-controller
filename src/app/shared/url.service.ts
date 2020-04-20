import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  readonly rootUrl = 'http://localhost:8888/api';
  readonly rootUrlRestart = 'http://localhost:8080/api';
  constructor() { }
}
