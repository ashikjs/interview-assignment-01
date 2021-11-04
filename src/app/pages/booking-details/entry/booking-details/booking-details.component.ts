import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "moment";
import * as _ from "lodash";

// Models
import { CalendarDate } from "@pages/booking-details/models/calendarDate";
import { Doctor } from "@pages/home/models/doctor";
import { IntervalsObject, IntervalsObjectByDateType } from "@pages/booking-details/models/intervalsObject";
import { AvailableDateObject } from "@pages/booking-details/models/available-date.object";

// @Service
import { BookingDetailsService } from "@pages/booking-details/services/booking-details.service";


@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {

  isLoading: boolean = false;
  doctor: Doctor | undefined | any;
  availableDatesObject: CalendarDate[] = [];
  availableDates: AvailableDateObject[] = [];
  todayDate: moment.Moment = moment().startOf('day');
  maxBookingDate: number = 120;
  availableTimeRange: IntervalsObject | undefined;
  selectedAppointmentDateTime: IntervalsObjectByDateType | undefined;
  bookingAppointmentData: any;

  @ViewChild('userBookingInfoRef')
  userBookingInfoRef: ElementRef | undefined;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private _bookingDetailsService: BookingDetailsService) {
    this.doctor = this.router.getCurrentNavigation()?.extras.state;
    const doctorId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.doctor) {
      this.isLoading = true;
      this._bookingDetailsService
        .getDoctorDetails(doctorId).subscribe(
        (doctor: Doctor) => {
          this.doctor = doctor;
          this.isLoading = false;
          this.initCalendar();
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        });
    }
  }

  ngOnInit(): void {
    if (this.doctor) {
      this.initCalendar();
    }
  }

  //**************************************//
  /*** public Method                  ***/
  //*************************************//
  public selectADate(data: any) {
    this.availableTimeRange = data?.intervals;
  }

  public onSelectConfirmTime(interval: IntervalsObjectByDateType) {
    this.selectedAppointmentDateTime = interval;
    this.userBookingInfoRef?.nativeElement.classList.add('show-modal');
  }

  public onClosed() {
    this.userBookingInfoRef?.nativeElement.classList.remove('show-modal');
  }

  public confirmBookingAppointment(data: any) {
    this.bookingAppointmentData = {
      doctor: {
        name: this.doctor?.name,
        id: this.doctor?.id
      },
      patient: {
        name: data?.name,
        phoneNumber: data?.phoneNumber,
        visitReason: data?.visitReason,
        gender: data?.gender,
      },
      appointmentStartDateTime: this.selectedAppointmentDateTime?.start,
      appointmentEndDateTime: this.selectedAppointmentDateTime?.end
    }
    // console.dir(this.bookingAppointmentData);
  }

  //**************************************//
  /*** private Method                  ***/
  //*************************************//

  private initCalendar() {
    this.availableDates = this.generateAvailableDates(this.doctor?.availabilities)
    this.availableDatesObject = this.formatCalendarDate(this.availableDates);
  }

  private formatCalendarDate(dates: AvailableDateObject[]): CalendarDate[] {
    return dates?.map(date => {
      return {
        disable: false,
        today: false,
        selected: true,
        mDate: moment(new Date(date.date)),
        intervals: this.generateIntervals(date)
      };
    });
  }

  private generateAvailableDates(availabilities?: { [key: string]: string }): AvailableDateObject[] {
    if (!!availabilities) {
      return this.fillDates(this.todayDate, this.maxBookingDate, availabilities)
    }
    return []
  }

  private fillDates(currentDate: moment.Moment, maxBookingDates: number, availableWeekDays: { [key: string]: string }): AvailableDateObject[] {
    const start = currentDate.date();
    return _.range(start, start + maxBookingDates)
      .map((day: number): any => {
        const date: moment.Moment = moment(currentDate)?.date(day);
        const weekDay = date?.format('ddd').toLocaleLowerCase();
        if (availableWeekDays.hasOwnProperty(weekDay)) {
          return {
            date: date.format("MM-DD-YYYY"),
            availability: availableWeekDays[weekDay]
          }
        }
        return '';
      }).filter(Boolean);
  }

  private generateIntervals(date: AvailableDateObject): IntervalsObject {
    const times = date?.availability?.split(' - ');
    const cDate = moment(new Date(date.date)).format("MM-DD-YYYY");

    return {
      start: moment(cDate + ' ' + times[0], ["MM-DD-YYYY h:mm A"]),
      end: moment(cDate + ' ' + times[1], ["MM-DD-YYYY h:mm A"])
    };
  }

}
