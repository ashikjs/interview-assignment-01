import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './entry/home/home.component';
import { RouterModule } from "@angular/router";
import { DoctorsComponent } from './containers/doctors/doctors.component';
import { DoctorCardComponent } from './components/doctor-card/doctor-card.component';

@NgModule({
  declarations: [
    HomeComponent,
    DoctorsComponent,
    DoctorCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ]),
  ]
})
export class HomeModule { }
