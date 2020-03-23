import { Injectable } from '@angular/core';
import { Register } from './register.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  formRegister: Register;
  readonly rootURL = 'http://localhost:8080/api';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }
  // create
  postRegister(form: Register) {
    return this.http.post(this.rootURL + '/register', form , this.httpOptions);
   }

}
