import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  readonly rootURL = 'http://localhost:8080/api';
  constructor() { }
}
