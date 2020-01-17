import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/users/user.service';
import {RepositoryService} from '../services/repository/repository.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  private repeated_password = "";
  private categories = [];
  private formFieldsDto = null;
  private formFields = [];
  private choosen_category = -1;
  private processInstance = "";
  private enumValues = [];
  private tasks = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private userService : UserService,private regService : RegistrationService, private repositoryService : RepositoryService, private router: Router) {
    

    let x = repositoryService.startProcess();

    x.subscribe(
      res => {
        console.log(res);
        //this.categories = res;
        this.formFieldsDto = res;
        this.formFields = res.formFields;
        this.processInstance = res.processInstanceId;
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

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onSubmit(value, form){
    let o = new Array();
    for (var property in value) {

      if(property == "scientificFields"){
        o.push({fieldId : property, fieldValue : "", fieldListValue:value[property]});
      }else{
        if(property == "reviewer" && value[property] == "")
          o.push({fieldId : property, fieldValue : "false", fieldListValue:[]});
        else
          o.push({fieldId : property, fieldValue : value[property], fieldListValue:[]});
      }
    }

    console.log(o);
    let x = this.userService.registerUser(o, this.formFieldsDto.taskId);

    x.subscribe(
      res => {
        console.log(res);       
        this.repositoryService.getRez(this.processInstance).subscribe(rez=>{
          if(rez === false){
            alert("Niste dobro popunili podatke!");
            window.location.reload();

          }else{
            alert("Uspjesno ste popunili podatke. Provjerite mejl kako biste potvrdili registraciju.");
          }
        });
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  getTasks(){
    let x = this.repositoryService.getTasks(this.processInstance);

    x.subscribe(
      res => {
        console.log(res);
        this.tasks = res;
      },
      err => {
        console.log("Error occured");
      }
    );
   }

  
}
