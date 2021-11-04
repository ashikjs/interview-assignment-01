import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './entry/home/home.component';
import { RouterModule } from "@angular/router";
import { DoctorsComponent } from './containers/doctors/doctors.component';
import { DoctorCardComponent } from './components/doctor-card/doctor-card.component';
import { LoadMoreModule } from "@shared/components/loading/load-more.module";

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
        LoadMoreModule,
    ]
})
export class HomeModule { }
