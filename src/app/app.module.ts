import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule} from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { Error404Component } from './error404/error404.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    Error404Component,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
