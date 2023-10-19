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
        const navigationExtras: NavigationExtras = {
          state: {
            nombre: this.nombre
          }
        };
        this.router.navigate(['/home'], navigationExtras);
      }, (error: any) => {
        this.password = ''
        this.nombre = ''
        alert('Correo o contrasena incorrecta')
      }
    );
  }
}


