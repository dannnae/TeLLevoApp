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
    password: '',
    es_conductor: false, 
    patente: '',
    marca: '',
    modelo: ''
  };
  confirmPassword = '';

  constructor(private router: Router, private djangoApi: DjangoService) {}

  onRegister() {
    if (this.userData.password !== this.confirmPassword) {
      console.log('Las contraseñas no coinciden');
      return;
    }

    if (this.userData.es_conductor) {
      if (!this.userData.patente || !this.userData.marca || !this.userData.modelo) {
        console.log('Por favor, complete los datos del vehículo');
        return;
      }
    }
    
    this.djangoApi.register(this.userData)
      .subscribe((response: any) => {
        this.router.navigate(['/login']);
        console.log('Registro exitoso:', response);
      }, (error: any) => {
        console.error('Error en el registro:', error);
        console.log(this.userData)
      });
  }
}
