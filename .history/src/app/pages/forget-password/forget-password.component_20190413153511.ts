import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private service: LoginService ) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {

  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
      this.service.formLogin = {
        MEMBER_ID: null,
        EMAIL: '',
        PASSWORD: '',
      };
  }
}
