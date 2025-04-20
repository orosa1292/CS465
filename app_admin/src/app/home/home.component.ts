import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from
'../services/authentication.service';
import { TripListingComponent } from '../trip-listing/trip-listing.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [FormsModule, CommonModule, TripListingComponent]
})
export class HomeComponent {
  constructor(
    private authenticationService: AuthenticationService
   ) { }
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
    }
}