import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../user.service.ts';
import {CookieService} from '../cookie.service.ts';
import {FileService} from '../file.service.ts';

@Component({
  selector: 'home',
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')],
  providers: [UserService, CookieService, FileService]
})

export class HomeComponent {
  username: string

  constructor (
    userService: UserService, 
    private router: Router,
    private cookieService: CookieService,
    private fileUploaderService: FileService,
    private http: Http
    ) {
    userService.getUser((err, data) => {
      console.log('home, getting user');
      if (err) {
        console.log(err);
        router.navigate(['./login'])
      } else {
        console.log(data);
        this.username = data.user.username;
      }
    })
  }

  logout(): void {
    this.cookieService.deleteCookie('access-token');
    this.router.navigate(['./login']);
  }

  onChange(event) {
    let file = event.target.files[0];
    console.log(file);
    this.fileUploaderService.uploadFile(file, (err, response) => {
      if (err) {
        console.log("err in upload file");
      } else {
        console.log("response: ", response);
      }
    });
  }


  uploadFile(file) {
  }
}