import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Register } from './register.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  formResetPassword: Register;
  readonly rootURL = 'http://localhost:8080/api';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }
  resetPassword(form: Register) {
    return this.http.put(this.rootURL + '/email', form , this.httpOptions);
   }
}
