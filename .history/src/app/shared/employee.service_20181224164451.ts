import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient, HttpClientJsonpModule} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;
  readonly rootURL = 'http://localhost:8081/add-user';

  constructor(private http: HttpClient) {}

  //insert 
  postEmployee(formData: Employee) {
    //console.log(this.http.post(this.rootURL, formData));
    return this.http.post(this.rootURL, formData);
     
   }

}
