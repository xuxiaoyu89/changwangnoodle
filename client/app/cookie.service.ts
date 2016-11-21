import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class CookieService {

  constructor () {}

  setCookie(cname: string, cvalue: string, exdays: number) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log(document.cookie);
  }

  getCookie() {

  }
}