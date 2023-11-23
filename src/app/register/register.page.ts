import { Component } from '@angular/core';
import { DjangoService } from '../services/django.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  userData = {
    email: '',
    nombre: '',
    telefono: '',
    direccion: '',
    password: '',
    
  };
  confirmPassword = '';

  constructor(private router: Router, private djangoApi: DjangoService) {}

  onRegister() {
    if (this.userData.password !== this.confirmPassword) {
      console.log('Las contraseñas no coinciden');
      return;
    }

    this.djangoApi.register(this.userData)
      .subscribe((response: any) => {
        this.router.navigate(['/login']);
        console.log('Registro exitoso:', response);
      }, (error: any) => {
        console.error('Error en el registro:', error);
      });
  }
}