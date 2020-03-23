import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(private service: EmployeeService , private toastr: ToastrService) {}

  user: Employee = new Employee();

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      Id: null,
      Email: '',
      Password: ''
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.Id == null) {
       this.insertRecord(form);
    } else {
       this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.service.postEmployee(form.value).subscribe(res => {
     this.toastr.success('Inserted successfully', 'EMP. Register');
     this.resetForm(form);
     this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putEmployee(form.value).subscribe(res => {
      this.toastr.info('Updated successfully', 'EMP. Register');
      this.resetForm(form);
      this.service.refreshList();
    });

  }

}
