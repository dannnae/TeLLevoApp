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
      (response: any[]) => {
        const navigationExtras: NavigationExtras = {
          state: {
            nombre: this.nombre
          }
        };
        this.router.navigate(['/home'], navigationExtras);
      }
    );
  }
}


