import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public httpClient: HttpClient) {}

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
