import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent implements OnInit{
  @Input('trip') trip: any;
  //@Input() trip!: Trip;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
      console.log("Trip card ngOnInit");
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
    }

  public editTrip(trip: Trip){
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode',trip.code);
    this.router.navigate(['edit-trip']);
  }
}