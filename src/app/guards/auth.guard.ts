import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DjangoService } from '../services/django.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private djangoApi: DjangoService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true; 
    } else {
      this.router.navigate(['/login']);
      return false; 
    }
  }
}
