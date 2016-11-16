import { Component } from '@angular/core';
import 'reflect-metadata';
@Component({
  selector: 'my-app',
  template: `
  	<nav>
      <a routerLink="/login" routerLinkActive="active">login</a>
      <a routerLink="/signup" routerLinkActive="active">signup</a>
      <a routerLink="/userlist" routerLinkActive="active">userlist</a>
    </nav>
  	<router-outlet></router-outlet>
  `
})
export class AppComponent { }
