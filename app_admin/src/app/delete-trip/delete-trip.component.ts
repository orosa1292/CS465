import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-delete-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delete-trip.component.html',
  styleUrl: './delete-trip.component.css'
})
export class DeleteTripComponent implements OnInit {
  public deleteForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService) { }

  ngOnInit() {
    this.deleteForm = this.formBuilder.group({
      code: ['', Validators.required]
    });
  }

  onDelete(): void {
    this.submitted = true;
    if (this.deleteForm.invalid) return;

    const tripCode = this.deleteForm.value.code;
    this.tripService.deleteTrip(tripCode).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => console.error('Delete failed', err)
    });
  }
}
