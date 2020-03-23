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
    this.checkbox = false;
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
      this.checkbox = true; // set checkbox ว่าจดจำค่า
    } else {
      this.service.formLogin = {
        id: null,
        username: '',
        password: '',
      };
    }
  }

  onSubmit(form: NgForm) {
    this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postLogin(form.value).subscribe((res: Response) => {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(res.token);

    this.authen.setAuthenticated(res.token); // set token ลง session client browser
    this.authen.setUsername(decodedToken.sub);         // set username ลง session client browser
    this.authen.setRole(decodedToken.role);                 // set role ลง session client browser

    this.toastr.success('ยินดีต้อนรับเข้าสู่ระบบ', 'Login success.');
    this.router.navigate(['/control']); // ไปยังหน้าดังกล่าว
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
    }
  }
}
