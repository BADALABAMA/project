import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private user: User;
  private users: User[] = [];

  constructor() {}

  public getUser() {
    return this.user;
  }
  public getUsers() {
    // let storedUsers = localStorage.getItem('users');
    // this.users = JSON.parse(storedUsers);

    return this.users;
  }

  public setUser(email: string, password: string) {
    this.user = {
      email: email,
      password: password,
    };
    return this.user;
  }

  public setUsers(user: User) {
    // const existedUser = this.users.find((u) => u.email === user.email);
    // if (!existedUser) {
    console.log('user added');
    return this.users.push(user);
    // } else if (existedUser) {
    //   console.log('user exist');
    // }
  }

  public removeUser(userToRemove: User): User[] {
    const users = this.getUsers();
    const updatedUsers = users.filter(
      (user) =>
        user.email !== userToRemove.email &&
        user.password !== userToRemove.password
    );
    // localStorage.setItem('user', JSON.stringify(updatedUsers));
    return updatedUsers;
  }
}
