import { Component, OnInit } from '@angular/core';
import { Doctor } from "@pages/home/models/doctor";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[] = [
    {
      id: '1',
      name: "Dr. John Doe",
      org: "Kings London Hospital",
      speciality: "BDS, MDS - Oral Maxillofacial Surgery",
      availabilities: {
        sun: "10:00 AM - 06:00 PM",
        mon: "10:00 AM - 06:00 PM",
        wed: "06:00 PM - 09:00 PM",
        thu: "06:00 PM - 09:00 PM"
      },
      visitDurationInMin: 15
    },
    {
      id: '2',
      name: "Dr. Mary Ellis",
      org: "ABC Hospital",
      speciality: "BDS, MDS - Oral Maxillofacial Surgery",
      availabilities: {
        sat: "06:00 PM - 09:00 PM",
        sun: "10:00 AM - 06:00 PM",
        wed: "06:00 PM - 09:00 PM"
      },
      visitDurationInMin: 15
    },
    {
      id: '3',
      name: "Dr. John Doe 2",
      org: "Kings London Hospital",
      speciality: "BDS, MDS - Oral Maxillofacial Surgery",
      availabilities: {
        sun: "10:00 AM - 06:00 PM",
        wed: "06:00 PM - 09:00 PM"
      },
      visitDurationInMin: 15
    },
    {
      id: '4',
      name: "Dr. Mary Ellis 2",
      org: "ABC Hospital",
      speciality: "BDS, MDS - Oral Maxillofacial Surgery",
      availabilities: {
        sat: "10:00 AM - 06:00 PM",
        sun: "10:00 AM - 06:00 PM",
        wed: "06:00 PM - 09:00 PM"
      },
      visitDurationInMin: 15
    },
    {
      id: '5',
      name: "Dr. Mary Ellis 059",
      org: "ABC Hospital",
      speciality: "BDS, MDS - Oral Maxillofacial Surgery",
      availabilities: {
        sat: "06:00 PM - 09:00 PM",
        sun: "10:00 AM - 06:00 PM",
        wed: "06:00 PM - 09:00 PM"
      },
      visitDurationInMin: 15
    },
    {
      id: '6',
      name: "Dr. John Doe 25",
      org: "Kings London Hospital",
      speciality: "BDS, MDS - Oral Maxillofacial Surgery",
      availabilities: {
        sun: "10:00 AM - 06:00 PM",
        wed: "06:00 PM - 09:00 PM"
      },
      visitDurationInMin: 15
    },
    {
      id: '7',
      name: "Dr. Mary Ellis 26",
      org: "ABC Hospital",
      speciality: "BDS, MDS - Oral Maxillofacial Surgery",
      availabilities: {
        sat: "10:00 AM - 06:00 PM",
        sun: "10:00 AM - 06:00 PM",
        wed: "06:00 PM - 09:00 PM"
      },
      visitDurationInMin: 15
    }
  ];

  constructor() {
  }

  ngOnInit(): void {

  }

}
