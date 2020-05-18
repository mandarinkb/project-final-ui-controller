import { Injectable } from '@angular/core';
import { Login } from './login.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isLoggedIn = false; // กำหนดสถานะล็อกอินเริ่มต้นเป็น false
  public redirectUrl = '';   // กำหนดตัวแปรสำหรับเก็บ url ที่จะลิ้งค์ไป

  formLogin: Login;
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,
              private url: UrlService) { }
  // create
  postLogin(form: Login) {
    return this.http.post(this.url.rootUrl + '/authenticate', form , this.httpOptions);
   }

}
