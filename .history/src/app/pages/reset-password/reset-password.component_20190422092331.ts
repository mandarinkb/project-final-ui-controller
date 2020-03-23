import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from 'src/app/shared/register.service';
import { ResetPasswordService } from 'src/app/shared/reset-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/shared/response.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private service: ResetPasswordService ,
              private toastr: ToastrService ,
              private router: Router ) {}

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formResetPassword = {
      NAME: '',
      SURNAME: '',
      EMAIL: '',
      PASSWORD: '',
      CONFIRM_PASSWORD: ''
    };
  }

  onSubmit(form: NgForm) {
     console.log(form.value);
     this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.resetPassword(form.value).subscribe((res: Response) => {
      if (res.status === 200) {
        this.toastr.success(res.message, 'Reset password success.');
        this.router.navigate(['/login']); // ไปยังหน้าดังกล่าว
       }
     }, err => {
      this.toastr.error('กรุณาส่งอีเมลเพื่อรีเซ็ตรหัสผ่านใหม่อีกครั้ง', 'เซสชั่นหมดอายุ');
      this.router.navigate(['/login']); // ไปยังหน้าดังกล่าว
     });
  }
}
