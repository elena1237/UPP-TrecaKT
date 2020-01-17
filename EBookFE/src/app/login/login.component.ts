import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(value, form){
    let x = this.userService.login(value.username, value.password);

    x.subscribe(
       res => {
        if (res.id!=null){
         alert("You registered successfully!");

          localStorage.setItem("uloga", res.role);
          localStorage.setItem("username", res.username);

          //this.router.navigate(['/home']);
          window.location.replace("/home");
          //window.location.reload();
        }else{
         alert("Wrong username or password!");
        }
       }
     );
  }
}
