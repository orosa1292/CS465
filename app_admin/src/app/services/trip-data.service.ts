import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';

import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }
  url = 'http://localhost:3000/api/trips';

  public getTrips(): Observable<Trip[]> {
    const token = localStorage.getItem('travlr-token'); // ✅ Retrieve token

    const httpOptions = {
        headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`
        }),
        params: { '_': new Date().getTime().toString() } // ✅ Force bypass cache
    };

    console.log("🔍 Fetching trips with token:", token); // Debug log

    return this.http.get<Trip[]>(this.url, httpOptions);
}

/* Old getTrips
  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }
    */

  public addTrip(formData: Trip): Observable<Trip> {
    const token = localStorage.getItem('travlr-token'); // ✅ Retrieve latest token

    const httpOptions = {
        headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        })
    };

    console.log("🔍 Adding trip with token:", token); // Debugging
    return this.http.post<Trip>(this.url, formData, httpOptions);
}
/* old addTrip

  addTrip(formData: Trip) : Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }
*/

public getTrip(tripCode: string): Observable<Trip> {
  const token = localStorage.getItem('travlr-token'); // ✅ Retrieve latest token

  const httpOptions = {
      headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      })
  };

  console.log("🔍 Fetching trip with token:", token); // Debugging
  return this.http.get<Trip>(`${this.url}/${tripCode}`, httpOptions);
}

public updateTrip(formData: Trip): Observable<Trip> {
  const token = localStorage.getItem('travlr-token'); // ✅ Retrieve latest token

  const httpOptions = {
      headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      })
  };

  console.log("🔍 Updating trip with token:", token); // Debugging
  return this.http.put<Trip>(`${this.url}/${formData.code}`, formData, httpOptions);
}


/* old getTrip
getTrip(tripCode: string) : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }
*/


/* old updateTrip
  updateTrip(formData: Trip) : Observable<Trip> {
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }

  */

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
      return this.makeAuthApiCall('login', user);
    }
   public register(user: User): Promise<AuthResponse> {
      return this.makeAuthApiCall('register', user);
    }
   private makeAuthApiCall(urlPath: string, user: User):
   Promise<AuthResponse> {
    console.log(urlPath);
    const url: string = `http://localhost:3000/api/${urlPath}`;
    console.log("sending request to: ", url);
    return lastValueFrom(
        this.http.post<AuthResponse>(url, user)
    ).catch(this.handleError);
}

   /* Deprecated method
   
   Promise<AuthResponse> {
    const url: string = this.url;
    return this.http
    .post(url, user)
    .toPromise()
    .then(response => response.json() as AuthResponse)
    .catch(this.handleError);
    } 
    /*/

}