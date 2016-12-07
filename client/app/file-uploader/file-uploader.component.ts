import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../user.service.ts';
import {CookieService} from '../cookie.service.ts';
import {FileService} from '../file.service.ts';

@Component({
  selector: 'file-uploader',
  template: require('./file-uploader.component.html'),
  styles: [require('./file-uploader.component.scss')],
  providers: [UserService, CookieService, FileService]
})

export class FileUploaderComponent {
  constructor (
    private cookieService: CookieService,
    private fileService: FileService,
    private http: Http
    ) {}

  onChange(event) {
    let file = event.target.files[0];
    console.log(file);
    this.getSignedRequest(file, (err, response) => {
      if (err) {
        console.log("err in upload file");
      } else {
        console.log("response: ", response);
      }
    });
  }

  getSignedRequest(file, callback): void {
    console.log('in getSignedRequest');
    const xhr = new XMLHttpRequest();
    let name = 'avatar/' + encodeURIComponent(file.name);
    let type = encodeURIComponent(file.type);
    let url = `http://localhost:3000/api/user/updateAvatar/?file-name=${name}&file-type=${type}`;
    console.log(url);
    xhr.open('GET', url);
    xhr.onreadystatechange = () => {
      console.log(xhr.readyState);
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          this.uploadFileToS3(file, response.signedRequest, response.url, callback);
        }
        else {
          console.log('fail to get signed request');
          callback(new Error('fail to get signed request'));
        }
      }
    }
    xhr.send();
  }

  uploadFileToS3(file, signedRequest, url, callback) {
    console.log('in uploadfiletos3');
    console.log('signedRequest: ', signedRequest);
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          (<HTMLImageElement>document.getElementById('avatar')).src = url;
          console.log('upload to S3 success');
          callback();
        }
        else{
          console.log(xhr.status);
          console.log(xhr);
          console.log('Could not upload file.');
          callback(new Error("Cannot upload file"));
        }
      }
    };
    xhr.send(file);
  }
}