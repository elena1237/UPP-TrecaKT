import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/user.service';
import { RegistrationService } from '../services/registration.service';
import { RepositoryService } from '../services/repository/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-processtext',
  templateUrl: './processtext.component.html',
  styleUrls: ['./processtext.component.css']
})
export class ProcessTextComponent implements OnInit {

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

    let username=localStorage.getItem("username");
    let x = repositoryService.startProcessText(username);

    x.subscribe(
      res => {
        console.log(res);
        //this.categories = res;
        this.formFieldsDto = res;
        this.formFields = res.formFields;
        this.processInstance = res.processInstanceId;
        localStorage.setItem("newpi",this.processInstance);
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
        o.push({fieldId : property, fieldValue : value[property][0], fieldListValue:value[property]});
      }else{
        o.push({fieldId : property, fieldValue : value[property], fieldListValue:[]});
      }

    }

    //postaviti glavnog urednika na onoga koji je ulogovan
    o.push({fieldId : "chiefEditor", fieldValue : localStorage.getItem("username"), fieldListValue:[]});

    console.log(o);
    let x = this.repositoryService.submitMagazine(o, this.formFieldsDto.taskId);

    x.subscribe(
      res => {
        console.log(res);      
        this.repositoryService.getDues(this.processInstance).subscribe(rez=>{
          if(rez === false){
            //window.location.reload();
            window.location.replace("/paydues");
          }else{
           
          }
      }),
      err => {
        console.log("Error occured");
      }
      });
  }

  
}
