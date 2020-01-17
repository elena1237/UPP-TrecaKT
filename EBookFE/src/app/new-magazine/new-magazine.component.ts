import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/user.service';
import { RepositoryService } from '../services/repository/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-magazine',
  templateUrl: './new-magazine.component.html',
  styleUrls: ['./new-magazine.component.css']
})

export class NewMagazineComponent implements OnInit {

  private formFieldsDto = null;
  private formFields = [];
  private formFieldsDto11 = null;
  private formFields1 = [];
  private processInstance = "";
  private enumPaymentsValues = [];
  private enumSciFieldsValues = [];
  private enumReviewersValues = [];
  private enumEditorsValues = [];
  selectedSciFields = [];
  selectedPayment = [];
  selectedReviewers = [];
  selectedEditors = [];
  dropdownSettings = {};
  dropdownSettingsPayment = {};
  show = false;
  nameMagazine = "";

  constructor(private userService : UserService, private repositoryService : RepositoryService, private router: Router) {
    
    let x = repositoryService.startProcessNewMagazine();

    x.subscribe(
      res => {
        console.log(res);
        this.formFieldsDto = res;
        this.formFields = res.formFields;
        this.processInstance = res.processInstanceId;
        localStorage.setItem("pi",this.processInstance);
        this.formFields.forEach( (field) =>{       
          if( field.id=='payment'){
            this.enumPaymentsValues = Object.keys(field.type.values);
          }else if(field.id=='scientificFields'){
            this.enumSciFieldsValues = Object.keys(field.type.values);
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

    this.dropdownSettingsPayment = {
      singleSelection: true,
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
      }else if(property == "payment"){
        o.push({fieldId : property, fieldValue : "", fieldListValue:value[property]});
      }else{
        if(property == "reviewer" && value[property] == "")
          o.push({fieldId : property, fieldValue : "false", fieldListValue:[]});
        else
          o.push({fieldId : property, fieldValue : value[property], fieldListValue:[]});
      }
    }

    //postaviti glavnog urednika na onog ko je ulogovan, procitati iz localStorage
    o.push({fieldId : "chiefEditor", fieldValue : localStorage.getItem("username"), fieldListValue:[]});


    console.log(o);
    let x = this.userService.newMagazine(o, this.formFieldsDto.taskId);

    x.subscribe(
      res => {
        console.log(res);       
        //this.show = true;
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let x = this.repositoryService.getForm2(this.processInstance);

          x.subscribe(
            res => {
              this.show = true;
              this.formFieldsDto11 = res;
              this.formFields1 = res.formFields;
              this.formFields1.forEach( (field) =>{       
                if( field.id=='reviewers'){
                  this.enumReviewersValues = Object.keys(field.type.values);
                }else if(field.id=='editors'){
                  this.enumEditorsValues = Object.keys(field.type.values);
                }
              });
            },
            err => {
              console.log("Error occured");
            }
          );
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  onSubmitEditorsAndREviewers(value, form){
    let o = new Array();

    for (var property in value) {

      if(property == "editors"){
        o.push({fieldId : property, fieldValue : "", fieldListValue:value[property]});
      }else if(property == "reviewers"){
        o.push({fieldId : property, fieldValue : "", fieldListValue:value[property]});
      }else{
        o.push({fieldId : property, fieldValue : value[property], fieldListValue:[]});
      }
    }

    console.log(o);

    let x = this.userService.addEditorsAndReviewrs(o, this.formFieldsDto11.taskId);

    x.subscribe(
      res => {
        console.log(res);       
        //this.show = true;
        alert("Uspjesno ste popunili podatke. Sacekajte odobrenje admina!");
      },
      err => {
        console.log("Error occured");
      }
    );
  }
}
