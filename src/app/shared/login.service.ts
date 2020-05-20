import { Injectable } from '@angular/core';
import { Login } from './login.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { AuthenService } from './authen.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // public isLoggedIn = false; // กำหนดสถานะล็อกอินเริ่มต้นเป็น false
  public redirectUrl = '';   // กำหนดตัวแปรสำหรับเก็บ url ที่จะลิ้งค์ไป
  public isAdmin = false;    // role admin

  formLogin: Login;
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,
              private url: UrlService,
              private auth: AuthenService,
              private router: Router) {}
  // authen
  postLogin(form: Login) {
    return this.http.post(this.url.rootUrl + '/authenticate', form , this.httpOptions);
  }

  // ตรวจสอบสถานะ admin
  checkAdmin() {
    if (this.auth.getRole() === 'admin') {this.isAdmin = true; }
  }

  logOut() {
    this.auth.clearAllSession();      // clear session
    this.router.navigate(['/login']); // redirect ไปยังหน้าดังกล่าว
    this.isAdmin = false ;            // clear ค่า role admin
  }

}
