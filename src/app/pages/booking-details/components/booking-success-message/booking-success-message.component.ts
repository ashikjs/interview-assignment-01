import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-success-message',
  templateUrl: './booking-success-message.component.html',
  styleUrls: ['./booking-success-message.component.scss']
})
export class BookingSuccessMessageComponent implements OnInit {

  @Input()
  bookingInfo: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
