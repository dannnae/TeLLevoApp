import { Component, OnInit } from '@angular/core';
import { DjangoService } from 'src/app/services/django.service';

@Component({
  selector: 'app-viajes-list',
  templateUrl: './viajes-list.component.html',
  styleUrls: ['./viajes-list.component.scss'],
})
export class ViajesListComponent implements OnInit {
  viajes: any[] = []; 

  constructor(private djangoApi: DjangoService) {}

  ngOnInit() {
    this.listarViajes();
  }

  listarViajes() {
    this.djangoApi.listarViajes().subscribe(
      (viajes: any[]) => {
        this.viajes = viajes;
        console.log('Lista de viajes:', this.viajes);
      },
      (error: any) => {
        console.error('Error al obtener la lista de viajes:', error);
      }
    );
  }
}
