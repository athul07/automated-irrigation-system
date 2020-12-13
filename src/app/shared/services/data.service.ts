import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getUserDetails() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  removeStorage(key) {
    localStorage.removeItem(key);
  }
}
