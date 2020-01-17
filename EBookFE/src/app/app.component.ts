import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private user = localStorage.getItem('username');
  private role = localStorage.getItem('uloga');

  constructor(private router: Router) { }

  ngOnInit(){}

  loggedIn(){
    if(this.user){
      return true; 
    }else{
      return false;
    }
  }

  logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("uloga");

    window.location.replace("/home");
    //this.router.navigate(['/home']);
    //window.location.reload();
  }

  notLoggedIn(){
    if(!this.user){
      return true; 
    }else{
      return false;
    }
  }

  isAdmin(){
    if(this.role == "admin"){
      return true; 
    }else{
      return false;
    }
  }

  isEditor(){
    if(this.role == "editor"){
      return true; 
    }else{
      return false;
    }
  }

  isReviewer(){
    if(this.role == "reviewer"){
      return true; 
    }else{
      return false;
    }
  }
}
