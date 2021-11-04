import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// @Environment
import { environment } from "@env";

// @Models
import { Doctor } from "@pages/home/models/doctor";

@Injectable({
  providedIn: 'root'
})

export class BookingDetailsService {
  private apiUri = `${environment.DoctorsApi}`;

  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  public getDoctorDetails(id: number): Observable<Doctor> {
    const uri = `${this.apiUri}/${id}`;
    return this._httpClient.get<Doctor>(uri);
  }
}
