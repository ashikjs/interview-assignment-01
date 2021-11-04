import { Component, Input, OnInit } from '@angular/core';
import { Doctor } from "@pages/home/models/doctor";

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss']
})
export class DoctorCardComponent implements OnInit {

  availabilities: string[] | undefined;

  @Input()
  doctor: Doctor | undefined;

  constructor() {
  }

  ngOnInit(): void {
    if (this.doctor) {
      this.availabilities = Object.keys(this.doctor?.availabilities);
    }
  }

}
