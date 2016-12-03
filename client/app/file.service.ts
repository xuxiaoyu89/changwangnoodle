import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class FileService {
  constructor (public http: Http) {}

  uploadFile(file, callback) {
    this.http.post('http://localhost:3000/api/file', {"data": "fake file"})
    .subscribe(
      data => { 
        callback(null, data);
      },
      err => {
        callback(err);
      }
    )
  }
}