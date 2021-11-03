import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import * as _ from "lodash";

// Models
import { CalendarDate } from "@pages/booking-details/models/calendarDate";
import { Doctor } from "@pages/home/models/doctor";


@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {

  doctor: Doctor | undefined;
  availableDatesObject: CalendarDate[] = [];
  availableDates: string[] = [];
  todayDate: moment.Moment = moment().startOf('day');
  maxBookingDate: number = 120;
  availableTimeRange: string | undefined;

  constructor() {
  }

  ngOnInit(): void {

    this.doctor = {
      id: '1',
      name: "Dr. John Doe",
      org: "Kings London Hospital",
      speciality: "BDS, MDS - Oral Maxillofacial Surgery",
      availabilities: {
        sun: "10:00 AM - 06:00 PM",
        mon: "09:00 AM - 06:00 PM",
        wed: "07:00 PM - 05:00 PM",
        thu: "06:00 PM - 09:00 PM"
      },
      visitDurationInMin: 15
    };
    this.availableDates = this.generateAvailableDates(Object.keys(this.doctor?.availabilities))

    this.availableDatesObject = this.formatCalendarDate(this.availableDates);
  }

  //**************************************//
  /*** public Method                  ***/
  //*************************************//
  public selectADate(data: any) {
    const weekDay = moment(data.mDate)?.format('ddd')?.toLocaleLowerCase();
    this.availableTimeRange = this.doctor?.availabilities[weekDay];
    console.log(this.availableTimeRange);

  }

  //**************************************//
  /*** private Method                  ***/
  //*************************************//

  private formatCalendarDate(dates: any[]): CalendarDate[] {
    return dates?.map(date => {
      return {
        disable: false,
        today: false,
        selected: true,
        mDate: moment(date),
        intervals: []
      };
    });
  }

  private generateAvailableDates(availabilities?: string[]): string[] {
    if (!!availabilities && availabilities?.length > 0) {
      return this.fillDates(this.todayDate, this.maxBookingDate, availabilities)
    }
    return []
  }

  private fillDates(currentDate: moment.Moment, maxBookingDates: number, availableWeekDays: string[]): string[] {
    const start = currentDate.date();
    return _.range(start, start + maxBookingDates)
      .map((day: number): any => {
        const date: moment.Moment = moment(currentDate)?.date(day);
        const isAvailable = availableWeekDays?.includes(date?.format('ddd').toLocaleLowerCase());
        return isAvailable ? date.format("MM-DD-YYYY") : '';
      }).filter(Boolean);
  }

}
