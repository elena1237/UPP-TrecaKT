import { Injectable } from '@angular/core';

import { Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  categories = [];
  languages = [];
  books = [];

  constructor(private httpClient: HttpClient, private http : Http) { }

  startProcess(){
    return this.httpClient.get('http://localhost:8089/welcome/get') as Observable<any>
  }

  startProcessNewMagazine(){
    return this.httpClient.get('http://localhost:8089/magazine/get') as Observable<any>
  }

  getTasks(processInstance : string){

    return this.httpClient.get('http://localhost:8089/welcome/get/tasks/'.concat(processInstance)) as Observable<any>
  }

  getRez(processInstance : string){

    return this.httpClient.get('http://localhost:8089/welcome/getRez/'.concat(processInstance)) as Observable<any>
  }

  getForm2(processInstance : string){
    return this.httpClient.get('http://localhost:8089/magazine/getForm2/'.concat(processInstance)) as Observable<any>
  }

  getActivateForm(processInstance : string){
    return this.httpClient.get('http://localhost:8089/magazine/getActivateForm/'.concat(processInstance)) as Observable<any>
  }

  getDues(processInstance : string){
    return this.httpClient.get('http://localhost:8089/text/getDues/'.concat(processInstance)) as Observable<any>
  }

  startProcessText(username : string){
    return this.httpClient.get('http://localhost:8089/text/get/'.concat(username)) as Observable<any>
  }

  submitMagazine(user, taskId) {
    return this.httpClient.post("http://localhost:8089/text/post/".concat(taskId), user) as Observable<any>;
  }

  getPayForm(processInstance : string){
    return this.httpClient.get('http://localhost:8089/text/getPayForm/'.concat(processInstance)) as Observable<any>
  }

  putPayDues(taskId, user){
    return this.httpClient.post('http://localhost:8089/text/putPayDues/'.concat(taskId), user) as Observable<any>
  }

  startProcessEnterData(processInstance : string){
    return this.httpClient.get('http://localhost:8089/text/getEnterDataForm/'.concat(processInstance)) as Observable<any>
  }

  submitEnterData(user, taskId) {
    return this.httpClient.post("http://localhost:8089/text/submitEnterData/".concat(taskId), user) as Observable<any>;
  }

  getFormForReview(processInstance : string){
    return this.httpClient.get('http://localhost:8089/text/getFormForReview/'.concat(processInstance)) as Observable<any>
  }
  
}
