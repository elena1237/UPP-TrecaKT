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
    return this.httpClient.get('http://localhost:8080/welcome/get') as Observable<any>
  }

  startProcessNewMagazine(){
    return this.httpClient.get('http://localhost:8080/magazine/get') as Observable<any>
  }

  getTasks(processInstance : string){

    return this.httpClient.get('http://localhost:8080/welcome/get/tasks/'.concat(processInstance)) as Observable<any>
  }

  getRez(processInstance : string){

    return this.httpClient.get('http://localhost:8080/welcome/getRez/'.concat(processInstance)) as Observable<any>
  }

  getForm2(processInstance : string){
    return this.httpClient.get('http://localhost:8080/magazine/getForm2/'.concat(processInstance)) as Observable<any>
  }

  getActivateForm(processInstance : string){
    return this.httpClient.get('http://localhost:8080/magazine/getActivateForm/'.concat(processInstance)) as Observable<any>
  }
}
