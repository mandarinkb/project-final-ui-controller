import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;
  readonly rootURL = 'http://localhost:8080/api';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  list: Employee[];


  constructor(private http: HttpClient) {}
  // create
  postEmployee(formData: Employee) {
    return this.http.post(this.rootURL, formData , this.httpOptions);
   }
  // red
  refreshList() {
    this.http.get(this.rootURL)
    .toPromise().then(res => this.list = res as Employee[]);
  }
  // update
  putEmployee(formData: Employee) {
    return this.http.put(this.rootURL, formData);
  }
  // delete
  deleteEmployee(id: number) {
    return this.http.delete(this.rootURL + '/' + id);
  }

}
