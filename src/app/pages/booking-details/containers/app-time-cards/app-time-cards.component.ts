import { Component, Input, OnInit } from '@angular/core';
import { IntervalsObject } from "@pages/booking-details/models/intervalsObject";
import * as moment from "moment";

@Component({
  selector: 'app-time-cards',
  templateUrl: './app-time-cards.component.html',
  styleUrls: ['./app-time-cards.component.scss']
})
export class AppTimeCardsComponent implements OnInit {

  availableTimes: string[] = [];
  incrementTime: number = 15 * 60 * 1000 // 15 Minutes in milliseconds
  selectedDate: moment.Moment | undefined;

  @Input()
  set timeRange(interval: IntervalsObject) {
    this.selectedDate = moment(interval.start);
    this.availableTimes = [];
    setTimeout(() => {
      this.generateAvailableTimes(interval);
    }, 10);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  public activeClass(event: any) {
    const els: any = document.querySelectorAll('#timeSlots .time-slot.active');
    for (const el of els) {
      el.classList.remove('active');
      el.classList.remove('confirmed');
    }

    event.target.closest('.time-slot').classList.add('active');
  }

  public timeConfirm(event: any, time: any): void {
    event.target.closest('.time-slot').classList.add('confirmed');
  }

  private generateAvailableTimes(interval: IntervalsObject) {
    let meetingStartTime = interval.start.valueOf();
    let meetingEndTime = interval.start.valueOf() + this.incrementTime;
    const maximumMeetingTimeTime = interval.end.valueOf();
    while (meetingEndTime <= maximumMeetingTimeTime) {
      const time: string = moment(meetingStartTime).format('hh:mm A') + ' - ' + moment(meetingEndTime).format('hh:mm A');
      this.availableTimes.push(time);
      meetingStartTime = meetingStartTime + this.incrementTime;
      meetingEndTime = meetingEndTime + this.incrementTime;
    }
  }

}
