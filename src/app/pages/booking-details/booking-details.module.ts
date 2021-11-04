import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDetailsComponent } from './entry/booking-details/booking-details.component';
import { SelectedDoctorCardComponent } from './components/selected-doctor-card/selected-doctor-card.component';
import { RouterModule } from "@angular/router";
import { CalenderComponent } from "@pages/booking-details/containers/calender/calender.component";
import { AppTimeCardsComponent } from './containers/app-time-cards/app-time-cards.component';


@NgModule({
    declarations: [
        BookingDetailsComponent,
        SelectedDoctorCardComponent,
        CalenderComponent,
        AppTimeCardsComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BookingDetailsComponent
      }
    ]),
  ]
})
export class BookingDetailsModule { }
