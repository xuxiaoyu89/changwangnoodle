import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class UserService {
	constructor (public http: Http) {}
	getUsers() {
		
	}
}