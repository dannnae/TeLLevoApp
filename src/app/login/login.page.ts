import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  nombre!: string;
  password!: string;
  
  constructor(private router: Router) { }

  login() {
    if (this.password.length && this.nombre.length< 4) {
      console.log('La contraseña debe tener al menos 4 caracteres');
      return;
    }
    
    const navigationExtras: NavigationExtras = {
      state: {
        nombre: this.nombre
      }
    };
    console.log(this.nombre)
    this.router.navigate(['/home'], navigationExtras);
  
  }
}


