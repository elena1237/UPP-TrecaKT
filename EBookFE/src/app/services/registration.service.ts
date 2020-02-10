import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  categories = [];
  languages = [];
  books = [];

  constructor(private httpClient: HttpClient) { 
    

  }
  getScientificFields(){
    return this.httpClient.get('http://localhost:8089/scifields/get') as Observable<any>
  }

  getReviewerConfirmForm(){
    return this.httpClient.get('http://localhost:8089/welcome/getReviewerConfirmForm') as Observable<any>
  }

  putConfirmReviewer(taskId, user){
    return this.httpClient.post('http://localhost:8089/welcome/postFormConfirmReviewer/'.concat(taskId), user) as Observable<any>
  }

  putActivateMagazine(taskId, magazine){
    return this.httpClient.post('http://localhost:8089/magazine/putActivateMagazine/'.concat(taskId), magazine) as Observable<any>
  }

}