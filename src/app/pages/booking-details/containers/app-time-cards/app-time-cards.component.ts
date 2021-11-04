import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IntervalsObject, IntervalsObjectByDateType } from "@pages/booking-details/models/intervalsObject";
import * as moment from "moment";

@Component({
  selector: 'app-time-cards',
  templateUrl: './app-time-cards.component.html',
  styleUrls: ['./app-time-cards.component.scss']
})
export class AppTimeCardsComponent implements OnInit {

  availableTimes: IntervalsObjectByDateType[] = [];
  incrementTime: number = 60 * 1000 // 1 Minutes in milliseconds
  selectedDate: moment.Moment | undefined;

  @Input()
  visitDuration: number | undefined;

  @Input()
  set timeRange(interval: IntervalsObject) {
    this.selectedDate = moment(interval.start);
    this.availableTimes = [];
    this.generateAvailableTimes(interval);
  }

  @Output()
  onConfirmTime: EventEmitter<any> = new EventEmitter();

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

  public timeConfirm(event: any, time: IntervalsObjectByDateType): void {
    this.onConfirmTime.emit(time)
    event.target.closest('.time-slot').classList.add('confirmed');
  }

  private generateAvailableTimes(interval: IntervalsObject) {
    let timeIncrement: number = 0;
    if (!!this.visitDuration)
      timeIncrement = this.visitDuration * this.incrementTime;

    let meetingStartTime = interval.start.valueOf();
    let meetingEndTime = interval.start.valueOf() + timeIncrement;
    const maximumMeetingTimeTime = interval.end.valueOf();

    while (meetingEndTime <= maximumMeetingTimeTime) {
      const time: IntervalsObjectByDateType = {
        start: new Date(meetingStartTime),
        end: new Date(meetingEndTime)
      };
      this.availableTimes.push(time);
      meetingStartTime = meetingStartTime + timeIncrement;
      meetingEndTime = meetingEndTime + timeIncrement;
    }
  }

}
