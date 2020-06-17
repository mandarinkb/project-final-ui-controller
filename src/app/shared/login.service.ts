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
  public hideMenu: boolean;
  public redirectUrl = '';   // กำหนดตัวแปรสำหรับเก็บ url ที่จะลิ้งค์ไป
  public isAdmin = false;    // role admin
  token: string;
  formLogin: Login;
  readonly options = {
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
    return this.http.post(this.url.rootUrl + '/authenticate', form , this.options);
  }

  // ตรวจสอบสถานะ admin
  checkAdmin() {
    if (this.auth.getRole() === 'admin') {this.isAdmin = true; }
  }

  getLogOut() {
    this.token = this.auth.getAuthenticated();
    return this.http.post(this.url.rootUrl + '/logout', this.httpOptions());
  }

  logOut() {
    this.getLogOut().subscribe();     // เพื่อบันทึก log logout

    setTimeout(() => {
      this.auth.clearAllSession();      // clear session
      this.router.navigate(['/login']); // redirect ไปยังหน้าดังกล่าว
      this.isAdmin = false ;            // clear ค่า role admin
    }, 1000); // delay 1 วินาที

  }

  httpOptions() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

}
