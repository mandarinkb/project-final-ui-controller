import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Users } from './users.model';
import { NgForm } from '@angular/forms';
import { UrlService } from '../url.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly rootURL = 'http://localhost:8080/api';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  formUsersData: Users;
  listUsers: Users[];
  constructor(private http: HttpClient,
              private rootUrl: UrlService) { }
  readUsers() {
    return this.http.get(this.rootURL + '/users');
  }

  saveUsers(form: NgForm) {
    return this.http.post(this.rootURL + '/users', form);
  }

  deleteUsers(id: number) {
    return this.http.delete(this.rootURL + '/users/' + id);
  }

  readUsersById(id: number) {
    return this.http.get(this.rootURL + '/users/' + id);
  }
  updateUsers(id: number, form: NgForm) {
    return this.http.put(this.rootURL + '/users/' + id , form);
  }
}
