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
  formUsersData: Users;
  listUsers: Users[];
  constructor(private http: HttpClient,
              private url: UrlService) {}
  readUsers() {
    return this.http.get(this.url.rootUrl + '/users');
  }
  readUserId(id) {
    return this.http.get(this.url.rootUrl + '/users/' + id);
  }
  saveUsers(form: NgForm) {
    return this.http.post(this.url.rootUrl + '/users', form);
  }
  deleteUsers(id: number) {
    return this.http.delete(this.url.rootUrl + '/users/' + id);
  }
  readUsersById(id: number) {
    return this.http.get(this.url.rootUrl + '/users/' + id);
  }
  updateUsers(form: NgForm) {
    return this.http.put(this.url.rootUrl + '/users' , form);
  }
}
