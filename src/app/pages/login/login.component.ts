import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/shared/response.model';
import { Router } from '@angular/router';
import { AuthenService } from 'src/app/shared/authen.service';
import { RememberMeService } from 'src/app/shared/remember-me.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  checkbox: boolean;
  constructor(public service: LoginService ,
              private toastr: ToastrService ,
              private router: Router ,
              private authen: AuthenService ,
              private remember: RememberMeService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    if (this.remember.getUsername() != null) { // กรณีที่ localstorage มีค่า
      this.service.formLogin = {
        id: null,
        username: this.remember.getUsername(),
        password: this.remember.getPassword(),
      };
      this.checkbox = true; // set checkbox ว่าจดจำค่าเมื่อเริ่มต้น
    } else {
      this.service.formLogin = {
        id: null,
        username: '',
        password: '',
      };
      this.checkbox = false;
    }
  }

  onSubmit(form: NgForm) {
    this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postLogin(form.value).subscribe((res: Response) => {

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(res.token); // ถอดรหัส token
    this.authen.setAuthenticated(res.token);    // set token ลง session client browser
    this.authen.setId(decodedToken.id);         // set id ลง session client browser
    this.authen.setUsername(decodedToken.sub);  // set username ลง session client browser
    this.authen.setRole(decodedToken.role);     // set role ลง session client browser

    // กรณีเก็บค่า redirect url ไว้ก่อนให้ไปหน้านั้น
    if (this.service.redirectUrl !== '') {
      this.router.navigate([this.service.redirectUrl]);
    } else { // กรณีไม่เก็บค่า redirect url ไว้ก่อนให้ไปหน้าเริ่มต้น
      this.router.navigate(['/control']); // redirect ไปยังหน้าดังกล่าว
    }

    this.service.checkAdmin();  // ตรวจสอบ role ว่าใช่ admin หรือไม่

    this.toastr.success('ยินดีต้อนรับเข้าสู่ระบบ', 'Login success.');
    }, err => {
      this.toastr.error('อีเมลหรือรหัสผ่านไม่ถูกต้อง', 'Login failed.');
    });
    this.resetForm(form);
  }
  // ปุ่ม checkbox remember me
  rememberMe(event) {
    this.checkbox = event.checked;
    // กรณีที่ไม่ได้ check remember me ให้เคลียค่าใน local storage
    if (this.checkbox === false) {
      this.remember.clearAllRemember();
    } else { // กรณีที่check remember me ให้เซ็ตค่า
      this.remember.setUsername(this.service.formLogin.username);
      this.remember.setPassword(this.service.formLogin.password);
      this.remember.setCheckRemember('checked');
    }
  }
}
