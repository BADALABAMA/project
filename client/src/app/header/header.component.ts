import { Component, OnInit } from '@angular/core';

import { HeaderService } from '../services/header.service';

import { IRouterLink } from '../interfaces/RouterLink';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public routerLinks: IRouterLink[] = [];
  public panelOpenState: boolean = true;
  public isVisibleExpansionPanel: boolean = false;
  public auth = this.headerService.getAuthLink();

  constructor(
    public headerService: HeaderService,
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  public getAuth() {
    return this.headerService.getAuthLink();
  }

  public setVisibility() {
    this.isVisibleExpansionPanel = !this.isVisibleExpansionPanel;
  }
  public logout() {
    localStorage.removeItem('user');
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
  }
}
