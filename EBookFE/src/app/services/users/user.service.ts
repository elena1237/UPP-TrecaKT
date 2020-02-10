import { Injectable } from '@angular/core';

import { Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClient: HttpClient) { }

  fetchUsers() {
    return this.httpClient.get("http://localhost:8089/user/fetch") as Observable<any>;
  }

  registerUser(user, taskId) {
    return this.httpClient.post("http://localhost:8089/welcome/post/".concat(taskId), user) as Observable<any>;
  }

  newMagazine(magazine, taskId) {
    return this.httpClient.post("http://localhost:8089/magazine/post/".concat(taskId), magazine) as Observable<any>;
  }

  addEditorsAndReviewrs(magazine, taskId) {
    return this.httpClient.post("http://localhost:8089/magazine/addEditorsAndReviewers/".concat(taskId), magazine) as Observable<any>;
  }

  login(username, password){
    return this.httpClient.get('http://localhost:8089/login/' + username + '/' + password) as Observable<any>
  }
}
