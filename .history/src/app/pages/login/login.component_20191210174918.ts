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
    console.log(form.value);
    const helper = new JwtHelperService();
    // const decodedToken = helper.decodeToken(myRawToken);
    // this.insertRecord(form);
    this.service.postLogin(form.value).subscribe((res: Response) => {
      console.log(res);
     });

    this.router.navigate(['/control']); // ไปยังหน้าดังกล่าว
  }

  insertRecord(form: NgForm) {
    this.service.postLogin(form.value).subscribe((res: Response) => {
     if (res.status === 200) {
      this.toastr.success(res.message, 'Login success.');
      this.authen.setAuthenticated(res.accessToken); // set token ลง session client browser
      this.authen.setId(res.id.toString());          // set id ลง session client browser
      this.authen.setUsername(res.username);         // set username ลง session client browser
      this.authen.setRole(res.role);                 // set role ลง session client browser
      this.authen.setDepartmentId(res.departmantId.toString());
      this.authen.setDepartmentName(res.departmentName);

      // กรณีที่กดจดจำ ให้บันทึกลง local storage
      if (this.checkbox === true) {
        this.remember.setUsername(this.service.formLogin.EMAIL);
        this.remember.setPassword(this.service.formLogin.PASSWORD);
        this.remember.setCheckRemember(String(this.checkbox));
      }
      this.router.navigate(['/dashboard']); // ไปยังหน้าดังกล่าว

     } else {
      this.toastr.error(res.message, 'Login failed.');
     }
     this.resetForm(form);
    });
  }
  // ปุ่ม checkbox remember me
  rememberMe(event) {
    this.checkbox = event.checked;
    // กรณีที่ไม่ได้ check remember me ให้เคลียค่าใน local storage
    if (this.checkbox === false) {
      this.remember.clearAllRemember();
    }
  }
}
