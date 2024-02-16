import { Component, OnInit } from '@angular/core';

import { HeaderService } from '../services/header.service';

import { IRouterLink } from '../interfaces/RouterLink';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public routerLinks: IRouterLink[] = [];
  public panelOpenState: boolean = true;
  public isVisibleExpansionPanel: boolean = false;

  public user: User;
  public authLabel: string;
  public isCurrentUser: boolean = false;

  constructor(
    public headerService: HeaderService,
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  public setVisibility() {
    this.isVisibleExpansionPanel = !this.isVisibleExpansionPanel;
  }
  public logout() {
    localStorage.removeItem('user');
    this.authService.logout();
    //   const users = this.usersService.getUsers();
    //   const user = this.usersService.getUser();
    //   const currentUser = this.authService.validateUser(user, users);
    //   if (currentUser) {
    //     this.usersService.removeUser(currentUser);
    //     console.log('user deleted');
    //   }
  }

  ngOnInit(): void {
    this.routerLinks = this.headerService.getRouterLinks();

    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      this.authLabel = isAuthenticated ? 'Logout' : 'Login';
    });
    this.usersService.getUser().subscribe((u) => {
      console.log(u);
      this.user = u;
    });

    this.usersService.getCurrentUser().subscribe((u) => {
      console.log(u);

      this.isCurrentUser = u;
    });
  }
}
