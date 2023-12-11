import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DjangoService } from '../services/django.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  nombre!: string;
  password!: string;
  
  constructor(private router: Router, private djangoApi: DjangoService) { }

  login() {
    if (this.password.length && this.nombre.length< 4) {
      return;
    }

    this.djangoApi.login(this.nombre, this.password).subscribe(
      (response: any) => {
        localStorage.setItem('token', JSON.stringify(response))
        const tokens = JSON.parse(localStorage.getItem('token') || '')

        const base64Url = tokens['access'].split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const decodedAccessToken = JSON.parse(jsonPayload);
        console.log(decodedAccessToken)

        const navigationExtras: NavigationExtras = {
          state: {
            nombre: this.nombre,
            is_conductor: decodedAccessToken.is_conductor,
            idConductor: decodedAccessToken.user_id,
          }
        };
        this.router.navigate(['/home'], navigationExtras);
      }, (error: any) => {
        console.error('error:', error);
      }
    );
    this.password = ''
    this.nombre = ''
  }
}


