import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}   from './app.component.ts';
import {LoginComponent} from './login/login.component.ts';

@NgModule({
  imports: [
  	BrowserModule, 
  	FormsModule,
  	ReactiveFormsModule
  ],
  declarations: [ 
  	AppComponent,
  	LoginComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
