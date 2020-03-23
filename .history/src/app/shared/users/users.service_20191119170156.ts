import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Users } from './users.model';
import { NgForm } from '@angular/forms';
import { UrlService } from '../url.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  formUsersData: Users;
  listUsers: Users[];
  constructor(private http: HttpClient,
              private url: UrlService) { }
  readUsers() {
    return this.http.get(this.url.rootUrl + '/users');
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
  updateUsers(id: number, form: NgForm) {
    return this.http.put(this.url.rootUrl + '/users/' + id , form);
  }
}
