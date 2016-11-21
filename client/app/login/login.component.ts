import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {
  FormBuilder,
  FormGroup, 
  Validators,
  AbstractControl
} from '@angular/forms';
import {UserService} from '../user.service.ts';
import {CookieService} from '../cookie.service.ts';

@Component({
  selector: "login",
  template: require('./login.component.html'),
  styles: [require('./login.component.scss'), require('../shared/styles/base.scss')],
  providers: [UserService, CookieService]
})
export class LoginComponent {
  loginForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  submitted: Boolean;
  http: Http;

  constructor(
    fb: FormBuilder, 
    http: Http, 
    private cookieService: CookieService,
    private router: Router
    ) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
    this.submitted = false;
    this.http = http;
  }

  onSubmit(form: any): void {
  	this.submitted = true;
    console.log("you submitted a form: ", form.controls.password.value);
    let password = form.controls.password.value;
    let username = form.controls.username.value;

    this.http.post('http://localhost:3000/api/login', {
      "username": username,
      "password": password
    })
    .subscribe(
      data => {
        data = JSON.parse(data._body);
        console.log(data);
        // store the access token to cookie
        this.cookieService.setCookie('access-token', data.accessToken, 1);
        this.router.navigate(['./userlist/user/'+data.id]);
      },
      err => console.log(err),
      () => console.log('Secret Quote Complete')
    );
  }

}