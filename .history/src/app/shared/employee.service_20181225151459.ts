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
  list2: any = [
    {
        'password': '1234',
        'id': 1,
        'email': 'man@se.com'
    },
    {
        'password': 'test',
        'id': 2,
        'email': 'test@se.com'
    },
    {
        'password': 'test2',
        'id': 3,
        'email': 'test2@se.com'
    },
    {
        'password': '1234',
        'id': 13,
        'email': 'demo@se.com'
    },
    {
        'password': '1234',
        'id': 14,
        'email': 'demo2@se.com'
    }
]
  ;

  constructor(private http: HttpClient) {}
  // insert
  postEmployee(formData: Employee) {
    return this.http.post(this.rootURL, formData , this.httpOptions);
   }
  // search
   refreshList() {
    this.http.get(this.rootURL)
    .toPromise().then(res => this.list = this.list2);
    //.toPromise().then(res => this.list = res as Employee[]);
  }


}
