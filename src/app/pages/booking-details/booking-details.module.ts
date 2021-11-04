import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDetailsComponent } from './entry/booking-details/booking-details.component';
import { SelectedDoctorCardComponent } from './components/selected-doctor-card/selected-doctor-card.component';
import { RouterModule } from "@angular/router";
import { CalenderComponent } from "@pages/booking-details/containers/calender/calender.component";
import { AppTimeCardsComponent } from './containers/app-time-cards/app-time-cards.component';
import { ReactiveFormsModule } from "@angular/forms";
import { BookingInfoFormComponent } from './containers/booking-info-form/booking-info-form.component';
import { BookingSuccessMessageComponent } from './components/booking-success-message/booking-success-message.component';


@NgModule({
    declarations: [
        BookingDetailsComponent,
        SelectedDoctorCardComponent,
        CalenderComponent,
        AppTimeCardsComponent,
        BookingInfoFormComponent,
        BookingSuccessMessageComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BookingDetailsComponent
      }
    ]),
    ReactiveFormsModule,
  ]
})
export class BookingDetailsModule { }
