import { Injectable } from '@angular/core';
import { Login } from './login.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  formLogin: Login;
  readonly rootURL = 'http://localhost:8080/api';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    },
    observe: 'response')
  };

  constructor(private http: HttpClient) { }
  // create
  postLogin(form: Login) {
    return this.http.post(this.rootURL + '/login', form , this.httpOptions);
   }

}
