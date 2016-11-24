import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
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

  constructor (
    userService: UserService, 
    private router: Router,
    private cookieService: CookieService
    ) {
    userService.getUser((err, data) => {
      console.log('home, getting user');
      if (err) {
        console.log(err);
        router.navigate(['./login'])
      } else {
        console.log(data);
        this.username = data.username;
      }
    })
  }

  logout(): void {
    this.cookieService.deleteCookie('access-token');
    this.router.navigate(['./login']);
  }
}