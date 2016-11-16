import {NgModule} from '@angular/core';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import {BrowserModule} from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import {AppComponent}   from './app.component.ts';
import {AppRoutingModule} from './app.router.ts';
import {LoginComponent} from './login/login.component.ts';
import {SignupComponent} from './signup/signup.component.ts';
import {UserListComponent} from './userlist/userlist.component.ts';
import {UserService} from './user.service.ts';



@NgModule({
  imports: [
  	BrowserModule, 
  	FormsModule,
  	ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [ 
  	AppComponent,
  	LoginComponent,
    SignupComponent,
    UserListComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class AppModule { }
