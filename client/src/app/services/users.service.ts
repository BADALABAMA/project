import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userSubject = new Subject<User>();
  private currentUser = new BehaviorSubject<boolean>(false);
  // private users: User[] = [];

  constructor() {}

  public getUser() {
    return this.userSubject.asObservable();
  }

  public getCurrentUser(): Observable<boolean> {
    return this.currentUser.asObservable();
  }

  public setUser(email: string, password: string) {
    const user = {
      email: email,
      password: password,
    };
    this.userSubject.next(user);

    localStorage.setItem('user', JSON.stringify(user));

    this.isCurrentUser();
  }

  public isCurrentUser() {
    if (localStorage.getItem('user')) {
      this.currentUser.next(true);
    } else {
      this.currentUser.next(false);
    }
  }
  // public getUsers() {
  //   // let storedUsers = localStorage.getItem('users');
  //   // this.users = JSON.parse(storedUsers);

  //   return this.users;
  // }

  // public setUsers(user: User) {
  //   // const existedUser = this.users.find((u) => u.email === user.email);
  //   // if (!existedUser) {
  //   console.log('user added');
  //   return this.users.push(user);
  //   // } else if (existedUser) {
  //   //   console.log('user exist');
  //   // }
  // }

  // public removeUser(userToRemove: User): User[] {
  //   const users = this.getUsers();
  //   const updatedUsers = users.filter(
  //     (user) =>
  //       user.email !== userToRemove.email &&
  //       user.password !== userToRemove.password
  //   );
  //   // localStorage.setItem('user', JSON.stringify(updatedUsers));
  //   return updatedUsers;
  // }
}
