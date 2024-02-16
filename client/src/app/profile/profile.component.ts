import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../interfaces/User';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  public userString = localStorage.getItem('user');
  public user = JSON.parse(this.userString);
  public isVisible: boolean = false;
  constructor(private usersService: UsersService) {
    this.usersService.getUser().subscribe((u) => {
      console.log(u);
    });
  }
  ngOnInit(): void {}

  public changeVisabillity() {
    return (this.isVisible = !this.isVisible);
  }

  public formHandler(form) {
    this.usersService.setUser(form.value.email, form.value.password);
    this.userString = localStorage.getItem('user');
    this.user = JSON.parse(this.userString);
  }
}
