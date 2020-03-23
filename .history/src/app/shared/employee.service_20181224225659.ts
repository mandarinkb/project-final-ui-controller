import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient) {}

  /*
  // insert
  postEmployee(formData: Employee) {
    return this.http.post(this.rootURL, formData);
   }
*/
strs : string = '{id: null, email: "ww", password: "wasd"}';
postEmployee (formData): Observable<any> {
  
  
  console.log(str);
  //return this.http.post<Employee>('http://localhost:8081/add-user', JSON.stringify(formData), this.httpOptions);
  return this.http.post<Employee>('http://localhost:8081/add-user', formData);
}



}
