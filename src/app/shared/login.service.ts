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
  constructor(private http: HttpClient,
              private url: UrlService,
              private auth: AuthenService,
              private router: Router) {}
  // authen
  postLogin(form: Login) {
    return this.http.post(this.url.rootUrl + '/authenticate', form);
  }

  refreshToken() {
    return this.http.post(this.url.rootUrl + '/token/refresh', {'refresh_token': this.auth.getRefreshToken()});
  }

  // ตรวจสอบสถานะ admin
  checkAdmin() {
    if (this.auth.getRole() === 'admin') {this.isAdmin = true; }
  }
  getLogOut() {
    return this.http.post(this.url.rootUrl + '/logout', null );
  }
  logOut() {
    this.getLogOut().subscribe();     // เพื่อบันทึก log logout
    this.router.navigate(['/login']);       // redirect ไปยังหน้าดังกล่าว
    this.isAdmin = false ;                  // clear ค่า role admin
    // หน่วงเวลา 1 วินาที แล้วค่อยลบข้อมูลใน session
    // ถ้าไม่หน่วงจะ bug เวลาเรียก refresh token ค่าจะเป็น nill เพราะลบไปก่อนแล้ว
    setTimeout(() => {
      this.auth.clearAllSession();      // clear session
    }, 1000);
  }
}
