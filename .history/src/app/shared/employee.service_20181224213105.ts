import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;
  readonly rootURL = 'http://localhost:8081/add-user';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }


  constructor(private http: HttpClient) {}

  // insert
  postEmployee(formData: Employee) {
    return this.http.post(this.rootURL, formData);
   }



}
