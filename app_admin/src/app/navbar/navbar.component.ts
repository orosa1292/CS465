import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from
'../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
selector: 'app-navbar',
templateUrl: './navbar.component.html',
styleUrls: ['./navbar.component.css'],
imports: [ FormsModule, CommonModule]
})
export class NavbarComponent implements OnInit {
constructor(
 private authenticationService: AuthenticationService,
 private router: Router
) { }
ngOnInit() { }
public isLoggedIn(): boolean {
 return this.authenticationService.isLoggedIn();
 }
public onLogout(): void {
 return this.authenticationService.logout();
 }
 public doLogin(): void {
  this.router.navigate(['login']);
 }
} 