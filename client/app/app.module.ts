import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}   from './app.component.ts';
import {LoginComponent} from './login/login.component.ts';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
  	BrowserModule, 
  	FormsModule,
  	ReactiveFormsModule,
    HttpModule
  ],
  declarations: [ 
  	AppComponent,
  	LoginComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
