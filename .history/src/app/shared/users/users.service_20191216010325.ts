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
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth.getAuthenticated()
    })
  };
  formUsersData: Users;
  listUsers: Users[];
  constructor(private http: HttpClient,
              private url: UrlService,
              private auth: AuthenService) { }
  readUsers() {
    return this.http.get(this.url.rootUrl + '/users', this.httpOptions);
  }

  saveUsers(form: NgForm) {
    return this.http.post(this.url.rootUrl + '/users', form, this.httpOptions);
  }

  deleteUsers(id: number) {
    return this.http.delete(this.url.rootUrl + '/users/' + id, this.httpOptions);
  }

  readUsersById(id: number) {
    return this.http.get(this.url.rootUrl + '/users/' + id, this.httpOptions);
  }
  updateUsers(id: number, form: NgForm) {
    return this.http.put(this.url.rootUrl + '/users/' + id , form, this.httpOptions);
  }
}
