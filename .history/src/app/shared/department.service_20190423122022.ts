import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  readonly rootURL = 'http://localhost:8080/api';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient  , private authen: AuthenService) { }

  readDepartment() {
        return this.http.get(this.rootURL + '/departmant');
    }
}
