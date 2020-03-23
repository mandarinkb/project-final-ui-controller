import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;
  //rootURL = 'http://localhost:8081/add-user';

  constructor(private http: HttpClient) {}

  // insert
  postEmployee(formData: Employee) {
    return this.http.post('http://localhost:8081/add-user', formData);
   }

}
