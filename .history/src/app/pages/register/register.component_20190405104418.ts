import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/shared/register.service';
import { NgForm } from '@angular/forms';
import { AuthenService } from 'src/app/shared/authen.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/shared/response.model';

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

  insertRecord(form: NgForm) {
    this.service.postRegister(form.value).subscribe((res: Response) => {
     console.log(res);
     console.log(res.message);
     console.log(res.status);
     if (res.status === 200) {
      this.toastr.success(res.message, 'EMP. Register');
      this.authen.setAuthenticated(res.accessToken); // set token ลง client browser
      this.router.navigate(['/login']); // ไปยังหน้าดังกล่าว
     } else {
      this.toastr.error(res.message, 'EMP. Register');
     }
     this.resetForm(form);
    });
  }

}
