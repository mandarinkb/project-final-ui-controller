import { Injectable } from '@angular/core';
import { Login } from './login.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { AuthenService } from './authen.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Response } from 'src/app/shared/response.model';

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

  refreshToken() {
    return this.http.post(this.url.rootUrl + '/token/refresh', {
      'refresh_token': this.auth.getRefreshToken()
    }).pipe(tap((tokens: Response) => {
      this.auth.setRefreshToken(tokens.refresh_token);
    }));
  }

  // ตรวจสอบสถานะ admin
  checkAdmin() {
    if (this.auth.getRole() === 'admin') {this.isAdmin = true; }
  }
  getLogOut() {
    this.token = this.auth.getAuthenticated();
    return this.http.post(this.url.rootUrl + '/logout', null );
  }
   logOut() {
    this.getLogOut().subscribe();     // เพื่อบันทึก log logout
    this.router.navigate(['/login']);       // redirect ไปยังหน้าดังกล่าว
    this.isAdmin = false ;                  // clear ค่า role admin
    this.auth.clearAllSession();      // clear session
  }
  // httpOptions() {
  //   return {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + this.token
  //     })
  //   };
  // }
}
