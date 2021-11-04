import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "@env";
import { Observable } from "rxjs";
import { Doctor } from "@pages/home/models/doctor";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUri = `${environment.DoctorsApi}`;

  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  public getDoctors(page?: number): Observable<Doctor[]> {
    const uri = this.apiUri;
    return this._httpClient.get<Doctor[]>(uri);
  }
}
