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
    const regex = new RegExp(/^[a-zA-Z.]+@duocuc.cl$/);

    if (!regex.test(this.userData.email)) return;

    if (this.userData.password !== this.confirmPassword) return;

    if (this.userData.es_conductor) {
      if (!this.userData.patente || !this.userData.marca || !this.userData.modelo) return;
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
