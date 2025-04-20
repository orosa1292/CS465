import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from '../services/trip-data.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
constructor(
 @Inject(BROWSER_STORAGE) private storage: Storage,
 private tripDataService: TripDataService
) { }
public getToken(): string | null {
    return this.storage.getItem('travlr-token');
 }
public saveToken(token: string): void {
  console.log("saving token: ", token);
 this.storage.setItem('travlr-token', token);
 console.log("Token after saving:", this.getToken());
 }
public login(user: User): Promise<any> {
  console.log("login method called");
 return this.tripDataService.login(user)
  .then((authResp: AuthResponse) =>{
    this.saveToken(authResp.token);
    console.log("auth response receieved:", authResp);
 })

 }
public register(user: User): Promise<any> {
 return this.tripDataService.register(user)
    .then((authResp: AuthResponse) => {
      this.saveToken(authResp.token);
 })

 }
public logout(): void {
 this.storage.removeItem('travlr-token');
 }
public isLoggedIn(): boolean {
 const token: string | null = this.getToken();
 if (token) {
 const payload = JSON.parse(atob(token.split('.')[1]));
 return payload.exp > (Date.now() / 1000);
 } else {
 return false;
 }
 }

 public getCurrentUser(): User | null {
  if (!this.isLoggedIn()) {
      return null; // Ensure function always returns something
  }

  const token: string | null = this.getToken();
  
  if (!token) {
      return null; // Handle missing token
  }

  try {
      const base64Url = token.split('.')[1]; // Extract payload
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Ensure URL-safe decoding
      const payload = JSON.parse(atob(base64)); // Decode

      return { email: payload.email, name: payload.name } as User;
  } catch (error) {
      console.error("Error parsing token:", error);
      return null; // Return null if parsing fails
  }
}


 /* Error code
public getCurrentUser(): User {
 if (this.isLoggedIn()) {
 const token : string | null = this.getToken();
 const { email, name } =
JSON.parse(atob(token.split('.')[1]));
 return { email, name } as User;
 }
 }
 */
}