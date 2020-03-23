import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from 'src/app/shared/response.model';


import { ForgetPasswordService } from 'src/app/shared/forget-password.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private service: ForgetPasswordService ,
              private toastr: ToastrService ,
              private router: Router ) { }

  ngOnInit() {
    this.resetForm();
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    // this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
      this.service.formSendEmail = {
        MEMBER_ID: null,
        EMAIL: '',
        PASSWORD: '',
      };
  }
  insertRecord(form: NgForm) {
    this.service.forgetPassword(form.value).subscribe((res: Response) => {
      if (res.status === 200) {
        this.toastr.success(res.message, 'Sent Email success.');
        this.router.navigate(['/login']); // ไปยังหน้าดังกล่าว
       } else {
        this.toastr.error(res.message, 'Sent Email fail.');
       }
     });
  }
}
