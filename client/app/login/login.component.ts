import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup, 
  Validators,
  AbstractControl
} from '@angular/forms'
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

  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
    this.submitted = false;
  }

  onSubmit(form: any): void {
  	this.submitted = true;
    console.log("you submitted a form: ", form);
  }
}