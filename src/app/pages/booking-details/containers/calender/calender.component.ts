import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import * as moment from 'moment';
import * as _ from 'lodash';

import { CalendarDate } from "@pages/booking-details/models/calendarDate";
import { IntervalsObject } from "@pages/booking-details/models/intervalsObject";

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit, OnChanges {
  currentMonth = moment();
  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];

  scheduleInterval: IntervalsObject[] = [];
  lastAvailableDate: any;
  todayDate: moment.Moment = moment().startOf('day');
  firstAvailableDate: any;
  selectedDate: any;

  @Input() activeDates: CalendarDate[] = [];
  @Output() selectADate: EventEmitter<object> = new EventEmitter<object>();

  constructor() {
    // debugger;
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.activeDates &&
      changes.activeDates.currentValue &&
      changes.activeDates.currentValue.length > 0) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(changes.activeDates?.currentValue, (m: CalendarDate) => m?.mDate?.valueOf());
      this.lastAvailableDate = _.last(this.activeDates)?.mDate;
      this.firstAvailableDate = _.first(this.activeDates)?.mDate;
      // console.log(this.activeDates);
      this.generateCalendar();
    }
  }

  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isPrevious(date: moment.Moment, currentDate: moment.Moment): boolean {
    if (this.isToday(date)) {
      return false;
    } else {
      return moment(date).isBefore(moment(currentDate), 'day');
    }
  }

  isActive(date: moment.Moment): object {
    const index = _.findIndex(this.activeDates, (selectedDate: any) => {
      return moment(date).isSame(selectedDate.mDate, 'day');
    });
    if (index > -1) {
      return {
        status: true,
        intervals: this.activeDates[index].intervals
      };
    } else {
      return {
        status: false,
        intervals: []
      };
    }
  }

  checkCurrentMonth(): boolean {
    return moment(this.currentMonth).isSame(this.firstAvailableDate, 'month');
  }

  checkNextMonthAvailableDate(): boolean {
    return moment(this.currentMonth).isSame(this.lastAvailableDate, 'month');
  }

  isSelectedMonth(date: moment.Moment | undefined): boolean {
    return moment(date).isSame(this.currentMonth, 'month');
  }

  onSelectDate(date: CalendarDate, event: any): void {
    this.scheduleInterval = date.intervals;

    const els: any = document.querySelectorAll('.week-date.selected');
    for (const el of els) {
      el.classList.remove('selected');
    }
    event.target?.closest('.week-date').classList.add('selected');
    this.selectedDate = date;
    this.selectADate.emit(date);
  }

  // actions from calendar

  prevMonth(): void {
    this.currentMonth = moment(this.currentMonth).subtract(1, 'months');
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth = moment(this.currentMonth).add(1, 'months');
    this.generateCalendar();
  }

  firstMonth(): void {
    this.currentMonth = moment(this.currentMonth).startOf('year');
    this.generateCalendar();
  }

  lastMonth(): void {
    this.currentMonth = moment(this.currentMonth).endOf('year');
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentMonth = moment(this.currentMonth).subtract(1, 'year');
    this.generateCalendar();
  }

  nextYear(): void {
    this.currentMonth = moment(this.currentMonth).add(1, 'year');
    this.generateCalendar();
  }

  // generate the calendar grid

  generateCalendar(): void {
    const dates = this.fillDates(this.currentMonth);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  fillDates(currentDate: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentDate).startOf('month').day();
    const firstDayOfGrid = moment(currentDate).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42)
      .map((date: number): CalendarDate => {
        const d = moment(firstDayOfGrid).date(date);
        const SELECTED = moment(this.selectedDate).isSame(d);
        const meeting: any = this.isActive(d);
        // console.log(SELECTED);
        return {
          disable: this.isPrevious(d, this.todayDate),
          today: this.isToday(d),
          selected: SELECTED,
          mDate: d,
          intervals: meeting.intervals,
          active: meeting.status
        };
      });
  }
}
