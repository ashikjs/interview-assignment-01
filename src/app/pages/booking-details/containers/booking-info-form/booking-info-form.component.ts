import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";

@Component({
  selector: 'app-booking-info-form',
  templateUrl: './booking-info-form.component.html',
  styleUrls: ['./booking-info-form.component.scss']
})
export class BookingInfoFormComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  @Output()
  onClosed: EventEmitter<any> = new EventEmitter()

  @Output()
  onSubmitBookingAppointment: EventEmitter<any> = new EventEmitter()

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      phoneNumber: [null, [
        Validators.pattern('^(01){1}[3456789]{1}(\\d){8}$'),
        Validators.maxLength(11),
        Validators.minLength(11)
      ]],
      gender: null,
      visitReason: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls;
  }

  public onSubmit(data: any, valid: boolean) {
    this.submitted = true;
    if (valid) {
      this.onSubmitBookingAppointment.emit(data);
      this.onCloseModal()
    }
  }

  onCloseModal() {
    this.onClosed.emit()
    this.form.reset();
    this.submitted = false;
  }

}
