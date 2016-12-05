import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../user.service.ts';
import {CookieService} from '../cookie.service.ts';
import {FileService} from '../file.service.ts';

@Component({
  selector: 'home',
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')],
  providers: [UserService, CookieService, FileService]
})

export class HomeComponent {
  username: string

  constructor (
    userService: UserService, 
    private router: Router,
    private cookieService: CookieService,
    private fileService: FileService,
    private http: Http
    ) {
    userService.getUser((err, data) => {
      console.log('home, getting user');
      if (err) {
        console.log(err);
        router.navigate(['./login'])
      } else {
        console.log(data);
        this.username = data.user.username;
      }
    })
  }

  logout(): void {
    this.cookieService.deleteCookie('access-token');
    this.router.navigate(['./login']);
  }

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
    let name = encodeURIComponent(file.name);
    let type = encodeURIComponent(file.type);
    let url = `http://localhost:3000/api/upload-s3/?file-name=${name}&file-type=${type}`;
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
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          /*document.getElementById('preview').src = url;
          document.getElementById('avatar-url').value = url;*/
          console.log('upload to S3 success');
          callback();
        }
        else{
          console.log('Could not upload file.');
          callback(new Error("Cannot upload file"));
        }
      }
    };
    xhr.send(file);
  }











}