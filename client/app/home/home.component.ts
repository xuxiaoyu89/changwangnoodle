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
    console.log('signedRequest: ', signedRequest);
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          document.getElementById('avatar').src = url;
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


/*

SignatureDoesNotMatch</Code><Message>The request signature we calculated does not match the signature you provided. Check your key and signing method.</Message><AWSAccessKeyId>AKIAJHBPKBNG6TJNNNQA</AWSAccessKeyId><StringToSign>PUT↵↵image/jpeg↵1480910906↵x-amz-acl:public-read↵/changwangnoodle/IMG_4292.JPG</StringToSign><SignatureProvided>VUhk/KpM+B43rT/9RxA0Q3spixg=</SignatureProvided><StringToSignBytes>50 55 54 0a 0a 69 6d 61 67 65 2f 6a 70 65 67 0a 31 34 38 30 39 31 30 39 30 36 0a 78 2d 61 6d 7a 2d 61 63 6c 3a 70 75 62 6c 69 63 2d 72 65 61 64 0a 2f 63 68 61 6e 67 77 61 6e 67 6e 6f 6f 64 6c 65 2f 49 4d 47 5f 34 32 39 32 2e 4a 50 47</StringToSignBytes><RequestId>B443D94360FBFEA6</RequestId><HostId>qDrFGqLiFZjwbeYRkrm3BH+h2HYMR3OXKqp9f9xKdO6gLGWhaJiEMNyyMsfueJ2qH7sFdMU7S14=</HostId></Error>"


*/








}