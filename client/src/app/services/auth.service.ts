import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(public httpClient: HttpClient) {}

  get isAuthenticated() {
    return this._isAuthenticated.asObservable();
  }

  login() {
    this._isAuthenticated.next(true);
  }

  logout() {
    this._isAuthenticated.next(false);
  }

  validateAuth(body) {
    return this.httpClient.post('http://localhost:3000/auth', body);
  }

  public validateUser(user?: User, users?: User[]): User | undefined {
    const currentUser = users.find(
      (u: User) => u.email === user.email && u.password === user.password
    );
    return currentUser;
  }
}
