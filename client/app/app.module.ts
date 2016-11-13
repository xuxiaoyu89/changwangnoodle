import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}   from './app.component.ts';
import {LoginComponent} from './login/login.component.ts';
import {SignupComponent} from './signup/signup.component.ts';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
  	BrowserModule, 
  	FormsModule,
  	ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: '', component: LoginComponent}
    ])
  ],
  declarations: [ 
  	AppComponent,
  	LoginComponent,
    SignupComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
