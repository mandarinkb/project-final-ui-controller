import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Register } from './register.model';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private http: HttpClient ,
    private activatedRoute: ActivatedRoute) {
      this.activatedRoute.queryParams.subscribe(params => {
        const date = params['token'];
        console.log(date); // Print the parameter to the console. 
     });
    }

  resetPassword(form: Register) {
    return this.http.put(this.rootURL + '/reset-password', form , this.httpOptions);
   }
}
