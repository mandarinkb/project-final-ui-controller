import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RememberMeService {
  private accessUsername = 'username';
  private accessPassword = 'password';
  private accessRememberMe = 'remmberMe';
  constructor() { }
  // username
  setUsername(username: string) {
    localStorage.setItem(this.accessUsername, username);
  }
  getUsername() {
    return localStorage.getItem(this.accessUsername);
  }
  clearUsername() {
    localStorage.removeItem(this.accessUsername);
  }

  // password
  setPassword(password: string) {
    localStorage.setItem(this.accessPassword, password);
  }
  getPassword() {
    return localStorage.getItem(this.accessPassword);
  }
  clearPassword() {
    localStorage.removeItem(this.accessPassword);
  }

  // checkbox
  setCheckRemmber(check: string) {
    localStorage.setItem(this.accessRememberMe, check);
  }
  getCheckRemmber() {
    return localStorage.getItem(this.accessRememberMe);
  }
  clearCheckRemmber() {
    localStorage.removeItem(this.accessRememberMe);
  }

}
