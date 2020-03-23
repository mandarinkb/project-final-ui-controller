import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/shared/register.service';
import { NgForm } from '@angular/forms';
import { AuthenService } from 'src/app/shared/authen.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/shared/response.model';
import { DepartmentService } from 'src/app/shared/department.service';
import { Department } from 'src/app/shared/department.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: RegisterService ,
              private toastr: ToastrService ,
              private router: Router ,
              private department: DepartmentService ) {
                      this.department.readDepartment().subscribe((res: Department[]) => {
                      this.department.listDepartment = res;
                });
              }

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
      DEPARTMENT_ID: ''
    };
  }

  onSubmit(form: NgForm) {
     console.log(form.value);
    // this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postRegister(form.value).subscribe((res: Response) => {
     if (res.status === 200) {
      this.toastr.success(res.message, 'EMP. Register');
      this.router.navigate(['/login']); // ไปยังหน้าดังกล่าว
     } else {
      this.toastr.error(res.message, 'EMP. Register');
     }
     this.resetForm(form);
    });
  }

}
