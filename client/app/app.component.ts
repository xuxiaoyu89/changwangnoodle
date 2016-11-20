import { Component } from '@angular/core';
import 'reflect-metadata';
@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')]
})
export class AppComponent { }
