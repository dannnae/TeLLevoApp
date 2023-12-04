import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DjangoService } from 'src/app/services/django.service';

@Component({
  selector: 'app-viajes-list',
  templateUrl: './viajes-list.component.html',
  styleUrls: ['./viajes-list.component.scss'],
})
export class ViajesListComponent implements OnInit {
  @Output() viajeSeleccionadoEmitter = new EventEmitter();
  viajes: any[] = [];
  viajeSeleccionado: any;

  constructor(private djangoApi: DjangoService) {}

  ngOnInit() {
    this.listarViajes();
  }

  listarViajes() {
    this.djangoApi.listarViajes().subscribe(
      (viajes: any[]) => {
        this.viajes = viajes;
        console.log('lista de viajes:', this.viajes);
      },
      (error: any) => {
        console.error('error al obtener la lista de viajes:', error);
      }
    );
  }

  onViajeSeleccionado() {
    this.viajeSeleccionadoEmitter.emit(this.viajes[this.viajeSeleccionado]);
  }

  seleccionarViaje(index: number) {
    this.viajeSeleccionado = this.viajes[index];
  }

  elegirViaje(index: number) {
    this.seleccionarViaje(index);
  }
}


