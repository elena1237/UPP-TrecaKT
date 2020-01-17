import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { RepositoryService } from '../services/repository/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activate-magazine',
  templateUrl: './activate-magazine.component.html',
  styleUrls: ['./activate-magazine.component.css']
})
export class ActivateMagazineComponent implements OnInit {

  private formFieldsDto = null;
  private formFields = [];
  private processInstance = "";
  private enumValues = [];
  active = false;
  constructor(private regService: RegistrationService, private repositoryService: RepositoryService, private router: Router) {

    let x = repositoryService.getActivateForm(localStorage.getItem("pi"));

    x.subscribe(
      res => {
        console.log(res);
        this.formFieldsDto = res;
        this.formFields = res.formFields;
        this.processInstance = res.processInstanceId;
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
      this.active = value["active"];
      if(property == "active" && value[property] == "")
          o.push({fieldId : property, fieldValue : "false", fieldListValue:[]});
      else
          o.push({fieldId : property, fieldValue : value[property], fieldListValue:[]});
    }

    console.log(o);
    let x = this.regService.putActivateMagazine(this.formFieldsDto.taskId, o);

    x.subscribe(
      res => {
        console.log(res);
        
        if(this.active == true)
          alert("CONFIRMED!");
        else
          this.router.navigateByUrl('/new-magazine');
      },
      err => {
        console.log("Error occured");
      }
    );
  }
}
