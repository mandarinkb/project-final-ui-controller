import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(private service: EmployeeService) {}

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
    this.insertRecord(form);
    //console.log(form.value);
  }

  insertRecord(form: NgForm) {
    console.log(form.value);
    this.service.postEmployee(form.value);
    /*this.service.postEmployee(form.value).subscribe(res => {
      // this.toastr.success('Inserted successfully', 'EMP. Register');
      this.resetForm(form);
      // this.service.refreshList();
    });
    */
  }
  createUser(): void {
    this.service.postEmployee(this.user)
        .subscribe( data => {
          alert("User created successfully.");
        });

  }

}
