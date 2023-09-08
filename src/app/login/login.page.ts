import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  nombre!: string;
  password!: string;
  router!: Router;

  constructor(_router: Router) {
    this.router = _router;
  }

  login() {
    if (this.password.length && this.nombre.length< 4) {
      console.log('La contraseña debe tener al menos 4 caracteres');
      return;
    }
    this.router.navigate(['/home'], { queryParams: { nombre: this.nombre } });
  }  
  
}


