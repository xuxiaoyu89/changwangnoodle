import { Component } from '@angular/core';
@Component({
  selector: "login",
  template: require('./login.component.html')
})
export class LoginComponent {
  onSubmit(form: any): void {
    console.log("you submitted a form: ", form);
  }
}