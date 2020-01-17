import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryService } from '../services/repository/repository.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-confirme-reviewer',
  templateUrl: './confirme-reviewer.component.html',
  styleUrls: ['./confirme-reviewer.component.css']
})

export class ConfirmeReviewerComponent implements OnInit {

  private formFieldsDto = null;
  private formFields = [];
  private processInstance = "";
  private enumValues = [];
  
  constructor(private regService: RegistrationService, private repositoryService: RepositoryService, private router: Router) {
    let x = regService.getReviewerConfirmForm();

    x.subscribe(
      res => {
        console.log(res);
        this.formFieldsDto = res;
        this.formFields = res.formFields;
        this.processInstance = res.processInstanceId;
        console.log(this.formFieldsDto.taskId + " task id")
        this.formFields.forEach( (field) =>{
          
          if( field.type.name=='enum'){
            this.enumValues = Object.keys(field.type.values);
          }
        });
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  ngOnInit() {
  }

  onSubmit(value, form){
    let o = new Array();
    for (var property in value) {
      console.log(property);
      console.log(value[property]);
      o.push({fieldId : property, fieldValue : value[property], fieldListValue:[]});
    }

    console.log(o);
    let x = this.regService.putConfirmReviewer(this.formFieldsDto.taskId, o);

    x.subscribe(
      res => {
        console.log(res);
        
        alert("CONFIRMED!");
       
        
      },
      err => {
        console.log("Error occured");
      }
    );
  }
}
