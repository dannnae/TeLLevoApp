import { Component, OnInit } from '@angular/core';
import { DjangoService } from '../services/django.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  datos: any;
  userId: number = 0;

  constructor(private djangoApi: DjangoService,  private router: Router) {}

  ngOnInit() {
    const userData = this.router.getCurrentNavigation()?.extras.state;
    if (userData) {
      this.userId = userData['idConductor'];
    }
    this.listarDatos();
  }

  listarDatos() {
    this.djangoApi.obtenerDatos(this.userId).subscribe(
      (datos: any) => {
        this.datos = datos;
        console.log('Perfil:', this.datos);
      },
      (error: any) => {
        console.error('error:', error);
      }
    );
  }
}


