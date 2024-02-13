import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/spinner.service';
import { UsersService } from '../services/users.service';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public errMessage: string = '';
  public user: User = this.usersService.getUser();
  public users: User[];

  constructor(
    public authService: AuthService,
    private spinner: SpinnerService,
    private usersService: UsersService
  ) {}

  public formHandler(form) {
    this.authService.validateAuth(form.value).subscribe((r) => {
      // this.users = this.usersService.getUsers();

      if (form.value.email !== '') {
        const newUser = this.usersService.setUser(
          form.value.email,
          form.value.password
        );
        localStorage.setItem('user', JSON.stringify(newUser));
        this.users = this.usersService.getUsers();
        this.usersService.setUsers(newUser);
        // const currentUser = this.authService.validateUser(newUser, this.users);
        // console.log(currentUser);
      }

      if (form.value.email == '') {
        const result = Object.keys(r);
        result.forEach((err) => {
          if (err === 'errMsg') {
            this.errMessage = r[err];
          }
        });
      }
    });
  }
}
