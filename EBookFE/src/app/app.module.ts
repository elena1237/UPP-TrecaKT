import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { RepositoryService } from './services/repository/repository.service';
import { UserService } from './services/users/user.service';

import { RegistrationComponent } from './registration/registration.component';

import {Authorized} from './guard/authorized.guard';
import {Admin} from './guard/admin.guard';
import {Notauthorized} from './guard/notauthorized.guard';
import { ConfirmeReviewerComponent } from './confirme-reviewer/confirme-reviewer.component';
import { NewMagazineComponent } from './new-magazine/new-magazine.component';
import { ActivateMagazineComponent } from './activate-magazine/activate-magazine.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProcessTextComponent } from './processtext/processtext.component';
import { PayduesComponent } from './paydues/paydues.component';
import { EnterDataOfSciWorkComponent } from './enter-data-of-sci-work/enter-data-of-sci-work.component';
import { ChiefEditorReviewComponent } from './chief-editor-review/chief-editor-review.component';

const ChildRoutes =
  [
  ]

  const RepositoryChildRoutes =
  [
    
  ]

const Routes = [
  {
    path: "registrate",
    component: RegistrationComponent,
    canActivate: [Notauthorized]
  },
  {
    path: "confirme",
    component: ConfirmeReviewerComponent,
    canActivate: [Notauthorized]
  },
  {
    path: "new-magazine",
    component: NewMagazineComponent,
    canActivate: [Notauthorized]
  },
  {
    path: "activate-magazine",
    component: ActivateMagazineComponent,
    canActivate: [Notauthorized]
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [Notauthorized]
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [Notauthorized]
  },
  {
    path: "processtext",
    component: ProcessTextComponent,
    canActivate: [Notauthorized]
  },
  {
    path: "paydues",
    component: PayduesComponent,
    canActivate: [Notauthorized]
  },
  {
    path: "enterdata",
    component: EnterDataOfSciWorkComponent,
    canActivate: [Notauthorized]
  },
  {
    path: "chiefeditorrev",
    component: ChiefEditorReviewComponent,
    canActivate: [Notauthorized]
  },
]


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    ConfirmeReviewerComponent,
    NewMagazineComponent,
    ActivateMagazineComponent,
    LoginComponent,
    HomeComponent,
    ProcessTextComponent,
    PayduesComponent,
    EnterDataOfSciWorkComponent,
    ChiefEditorReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(Routes),
    HttpClientModule, 
    HttpModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  
  providers:  [
    Admin,
    Authorized,
    Notauthorized
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
