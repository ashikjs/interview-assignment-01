import { Component, Input, OnInit } from '@angular/core';
import { Doctor } from "@pages/home/models/doctor";

@Component({
  selector: 'app-selected-doctor-card',
  templateUrl: './selected-doctor-card.component.html',
  styleUrls: ['./selected-doctor-card.component.scss']
})
export class SelectedDoctorCardComponent implements OnInit {

  @Input()
  doctor: Doctor | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
