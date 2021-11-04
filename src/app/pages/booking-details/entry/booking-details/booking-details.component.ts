import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as moment from "moment";
import * as _ from "lodash";

// Models
import { CalendarDate } from "@pages/booking-details/models/calendarDate";
import { Doctor } from "@pages/home/models/doctor";
import { IntervalsObject } from "@pages/booking-details/models/intervalsObject";
import { AvailableDateObject } from "@pages/booking-details/models/available-date.object";


@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {

  doctor: Doctor | undefined | any;
  availableDatesObject: CalendarDate[] = [];
  availableDates: AvailableDateObject[] = [];
  todayDate: moment.Moment = moment().startOf('day');
  maxBookingDate: number = 120;
  availableTimeRange: IntervalsObject | undefined;

  constructor(private router: Router) {
    this.doctor = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {

    this.availableDates = this.generateAvailableDates(this.doctor?.availabilities)
    console.log(this.availableDates);
    this.availableDatesObject = this.formatCalendarDate(this.availableDates);
  }

  //**************************************//
  /*** public Method                  ***/
  //*************************************//
  public selectADate(data: any) {
    this.availableTimeRange = data?.intervals;
  }

  //**************************************//
  /*** private Method                  ***/
  //*************************************//

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

  onSelectConfirmTime(interval: any) {
    console.log(interval);
  }
}
