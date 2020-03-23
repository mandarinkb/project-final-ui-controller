import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/shared/register.service';
import { NgForm } from '@angular/forms';
import { AuthenService } from 'src/app/shared/authen.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: RegisterService ,  private toastr: ToastrService ,
              private router: Router , private authen: AuthenService) { }

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
    console.log(form.value);

  }

}
