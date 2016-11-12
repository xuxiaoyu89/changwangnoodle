import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import {
  FormBuilder,
  FormGroup, 
  Validators,
  AbstractControl
} from '@angular/forms';
@Component({
  selector: "signup",
  template: require('./signup.component.html')
})
export class SignupComponent {
  signupForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  submitted: Boolean;
  http: Http;

  constructor(fb: FormBuilder, http: Http) {
    this.signupForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.username = this.signupForm.controls['username'];
    this.password = this.signupForm.controls['password'];
    this.submitted = false;
    this.http = http;
  }

  onSubmit(form: any): void {
  	this.submitted = true;
    console.log("you submitted a form: ", form.controls.password.value);
    let password = form.controls.password.value;
    let username = form.controls.username.value;

    this.http.post('http://localhost:3000/api/signup', {
      "username": username,
      "password": password
    })
    .subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('Secret Quote Complete')
    );
  }


}