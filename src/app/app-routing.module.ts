import { RouterModule } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule
  ]
})
export class AppRoutingModule { }
