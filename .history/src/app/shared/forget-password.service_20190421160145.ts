import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Login } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  formSendEmail: Login;
  readonly rootURL = 'http://localhost:8080/api';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }
  //
  forgetPassword(form: Login) {
    return this.http.put(this.rootURL + '/email', form , this.httpOptions);
   }

}
