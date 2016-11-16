import { Component, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {UserService} from '../user.service.ts';

@Component ({
  selector: "user-info",
  template: require("./userinfo.component.html"),
  providers: [UserService]
})
export class UserInfoComponent {
  id: number;

  constructor(private userServcie: UserService) {
    this.id = 1;
  }
}