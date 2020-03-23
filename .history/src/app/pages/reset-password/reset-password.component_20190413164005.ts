import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from 'src/app/shared/register.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private service: RegisterService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formRegister = {
      NAME: '',
      SURNAME: '',
      EMAIL: '',
      PASSWORD: '',
      CONFIRM_PASSWORD: ''
    };
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    // this.insertRecord(form);
  }
}
