import { Component, OnInit } from '@angular/core';
import { Doctor } from "@pages/home/models/doctor";
import { DoctorService } from "@pages/home/services/doctor.service";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  isLoading: boolean = true;
  doctors: Doctor[] | undefined;

  constructor(private _doctorService: DoctorService) {
    this._doctorService
      .getDoctors().subscribe(
      (doctors: Doctor[]) => {
        this.doctors = doctors;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      });
  }

  ngOnInit(): void {

  }

}
