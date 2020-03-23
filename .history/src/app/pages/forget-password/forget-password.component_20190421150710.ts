import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { LoginService } from 'src/app/shared/login.service';
import { ForgetPasswordService } from 'src/app/shared/forget-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private service: ForgetPasswordService ) { }

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
}
