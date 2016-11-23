import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import {UserService} from '../user.service.ts';
import {CookieService} from '../cookie.service.ts';

@Component({
  selector: 'home',
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')],
  providers: [UserService, CookieService]
})

export class HomeComponent {
  username: string

  constructor (userService: UserService) {
    userService.getUser((err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        this.username = data.username;
      }
    })
  }
}