import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {
  FormBuilder,
  FormGroup, 
  Validators,
  AbstractControl
} from '@angular/forms';
@Component({
  selector: "signup",
  template: require('./signup.component.html'),
  styles: [require('./signup.component.scss'), require('../shared/styles/base.scss')]
})
export class SignupComponent {
  signupForm: FormGroup;
  email: AbstractControl;
  username: AbstractControl;
  password: AbstractControl;
  confirm_password: AbstractControl;
  submitted: Boolean;

  constructor(fb: FormBuilder, public http: Http, public router: Router) {
    this.signupForm = fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
    this.email = this.signupForm.controls['email'];
    this.username = this.signupForm.controls['username'];
    this.password = this.signupForm.controls['password'];
    this.confirm_password = this.signupForm.controls['confirm_password'];
    this.submitted = false;
  }

  onSubmit(form: any): void {
  	this.submitted = true;
    console.log("you submitted a form: ", form.controls.password.value);
    let password = form.controls.password.value;
    let username = form.controls.username.value;
    let email = form.controls.email.value;

    this.http.post('http://localhost:3000/api/signup', {
      "username": username,
      "password": password,
      "email": email
    })
    .subscribe(
      data => { console.log(data); this.router.navigate(['./userlist']); },
      err => console.log(err),
      () => console.log('Secret Quote Complete')
    );
  }


}