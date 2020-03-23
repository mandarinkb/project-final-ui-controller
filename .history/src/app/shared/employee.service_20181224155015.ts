import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;

  constructor() {}

  postEmployee(formData : Employee){
    //return this.http.post(this.rootURL+'/Employee',formData);
     
   }

}
