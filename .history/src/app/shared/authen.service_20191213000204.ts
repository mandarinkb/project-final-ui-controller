import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  private accessKey = 'token';
  private accessId = 'id';
  private accessUsername = 'username';
  private accessRole = 'role';
  constructor() { }

  // set token ลง client browser
  setAuthenticated(token: string) {
    sessionStorage.setItem(this.accessKey, token);
  }

  // get token ใน client browser
  getAuthenticated() {
    return sessionStorage.getItem(this.accessKey);
  }

  // ลบ token ใน client browser
  clearAuthenticated() {
    sessionStorage.removeItem(this.accessKey);
  }

  setId(id: string) {
    sessionStorage.setItem(this.accessId, id);
  }

  getId() {
    return sessionStorage.getItem(this.accessId);
  }

  clearId() {
    sessionStorage.removeItem(this.accessId);
  }

  setUsername(username: string) {
    sessionStorage.setItem(this.accessUsername, username);
  }

  getUsername() {
    return sessionStorage.getItem(this.accessUsername);
  }

  clearUsername() {
    sessionStorage.removeItem(this.accessUsername);
  }

  setRole(role: string) {
    sessionStorage.setItem(this.accessRole, role);
  }

  getRole() {
    return sessionStorage.getItem(this.accessRole);
  }

  clearRole() {
    sessionStorage.removeItem(this.accessRole);
  }

  clearAllSession() {
    this.clearAuthenticated();
    this.clearId();
    this.clearUsername();
    this.clearRole();
  }
}
