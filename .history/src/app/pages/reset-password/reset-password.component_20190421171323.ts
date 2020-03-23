import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from 'src/app/shared/register.service';
import { ResetPasswordService } from 'src/app/shared/reset-password.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private service: ResetPasswordService ,
               private activatedRoute: ActivatedRoute) {
             /*   this.activatedRoute.queryParams.subscribe(params => {
                  const date = params['token'];
                  console.log(date); // Print the parameter to the console. 
              });
              */
  }

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
     /* if (res.status === 200) {
        this.toastr.success(res.message, 'Send email success.');
        this.router.navigate(['/login']); // ไปยังหน้าดังกล่าว
       } else {
        this.toastr.error(res.message, 'Send email failed.');
        this.router.navigate(['/login']); // ไปยังหน้าดังกล่าว
       }
       */
     });
  }
}
