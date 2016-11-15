import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';

@Component ({
	selector: "user-list",
	template: require("./userlist.component.html")
})
export class UserListComponent {
	ids: Array<number>;

	constructor() {
		this.ids = [1,2,3,4];
	}
}