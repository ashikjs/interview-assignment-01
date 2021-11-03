import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedDoctorCardComponent } from './selected-doctor-card.component';

describe('SelectedDoctorCardComponent', () => {
  let component: SelectedDoctorCardComponent;
  let fixture: ComponentFixture<SelectedDoctorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedDoctorCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedDoctorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
