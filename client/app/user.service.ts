import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class UserService {
	constructor (public http: Http) {}
	getUsers(callback) {
		this.http.get('http://localhost:3000/api/users')
		.subscribe(
			(data) => {callback(null, data._body);},
			(err) => {callback(err, null);},
			() => console.log("nothing")
		);
	}
}