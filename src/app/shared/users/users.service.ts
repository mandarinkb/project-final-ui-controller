import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Users } from './users.model';
import { NgForm } from '@angular/forms';
import { UrlService } from '../url.service';
import { AuthenService } from '../authen.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token: string;
  formUsersData: Users;
  listUsers: Users[];
  constructor(private http: HttpClient,
              private url: UrlService,
              private auth: AuthenService) {}
  readUsers() {
    this.token = this.auth.getAuthenticated();
    return this.http.get(this.url.rootUrl + '/users');
  }
  readUserId(id) {
    this.token = this.auth.getAuthenticated();
    return this.http.get(this.url.rootUrl + '/users/' + id);
  }
  saveUsers(form: NgForm) {
    this.token = this.auth.getAuthenticated();
    return this.http.post(this.url.rootUrl + '/users', form);
  }
  deleteUsers(id: number) {
    this.token = this.auth.getAuthenticated();
    return this.http.delete(this.url.rootUrl + '/users/' + id);
  }
  readUsersById(id: number) {
    this.token = this.auth.getAuthenticated();
    return this.http.get(this.url.rootUrl + '/users/' + id);
  }
  updateUsers(form: NgForm) {
    this.token = this.auth.getAuthenticated();
    return this.http.put(this.url.rootUrl + '/users' , form);
  }
  // httpOptions() {
  //   return {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + this.token
  //     })
  //   };
  // }
}
