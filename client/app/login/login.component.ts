import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms'
@Component({
  selector: "login",
  template: require('./login.component.html')
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['']
    });
  }

  onSubmit(form: any): void {
    console.log("you submitted a form: ", form);
  }
}