import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import {
  FormBuilder,
  FormGroup, 
  Validators,
  AbstractControl
} from '@angular/forms';
@Component({
  selector: "login",
  template: require('./login.component.html'),
  styles: [require('./login.component.scss')],
})
export class LoginComponent {
  loginForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  submitted: Boolean;
  http: Http;

  constructor(fb: FormBuilder, http: Http) {
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
    console.log("you submitted a form: ", form);
    console.log(this.http);
    this.http.post('http://localhost:3000/api/login', {"test": "hello world"})
    .subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('Secret Quote Complete')
    );
  }


}