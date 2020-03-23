import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
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
postEmployee (formData): Observable<any> {
  console.log(formData);
  return this.http.post<any>('http://localhost:8081/add-user', formData, this.httpOptions);

}



}
