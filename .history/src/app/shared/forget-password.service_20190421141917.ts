import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Login } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  readonly rootURL = 'http://localhost:8080/api';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }
  // create
  forgetPassword(form: Login) {
    return this.http.post(this.rootURL + '/login', form , this.httpOptions);
   }

}
