import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { RepositoryService } from '../services/repository/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paydues',
  templateUrl: './paydues.component.html',
  styleUrls: ['./paydues.component.css']
})
export class PayduesComponent implements OnInit {
  
  private formFieldsDto = null;
  private formFields = [];
  private processInstance = "";
  private enumValues = [];
  pay = false;
  constructor(private regService: RegistrationService, private repositoryService: RepositoryService, private router: Router) {

    let x = repositoryService.getPayForm(localStorage.getItem("newpi"));

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
      this.pay = value["pay"];
      if(property == "pay" && value[property] == "")
          o.push({fieldId : property, fieldValue : "false", fieldListValue:[]});
      else
          o.push({fieldId : property, fieldValue : value[property], fieldListValue:[]});
    }

    console.log(o);
    let x = this.repositoryService.putPayDues(this.formFieldsDto.taskId, o);

    x.subscribe(
      res => {
        console.log(res);
        
        if(this.pay == true){
          alert("PAID!");
          this.router.navigateByUrl('/enterdata');
        }
        else
        {
          alert("ELSE!");
          this.router.navigateByUrl('/paydues');
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

}
