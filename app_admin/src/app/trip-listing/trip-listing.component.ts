import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

import { Router } from '@angular/router';
import { trips } from '../data/trips';

import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css',
  providers: [TripDataService]
})

export class TripListingComponent implements OnInit{
  trips!: Trip[];
  //trips: Array<any> = trips;
  message: string = '';

  constructor(
    private tripDataService: TripDataService, 
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    console.log('trip-listing constructor');
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
    }

  public addTrip(): void {
    this.router.navigate(['add-trip'])
  }

  public editTrip(tripCode: string): void {
    this.router.navigate([`edit-trip/${tripCode}`]);
  }

  public deleteTrip(tripCode: string): void {
    if (confirm(`Are you sure you want to delete trip '${tripCode}'?`)) {
      this.tripDataService.deleteTrip(tripCode).subscribe({
        next: () => this.getStuff(), // Reloads the trip list
        error: err => console.error(`Delete error:`, err)
      });
    }
  }

  private getStuff(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = value;
          if(value.length > 0)
          {
            this.message = 'There are ' + value.length + ' trips available.';
            console.log("Trips are stored in component:", this.trips);
          }
          else{
           this.message = 'There were no trips retrieved from the database';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
}

  ngOnInit(): void {
    console.log('ngOnInit');
    // Wait until token is set before fetching trips
    setTimeout(() => {
      this.getStuff();
  }, 500);  }
}