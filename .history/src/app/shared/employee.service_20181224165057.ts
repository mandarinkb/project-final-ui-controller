import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;
  readonly rootURL = 'http://localhost:8081/add-user';

  constructor(private http: HttpClient) {}

  //insert 
  postEmployee(formData: Employee) {
    return this.http.post(this.rootURL, formData);
     
   }

}
