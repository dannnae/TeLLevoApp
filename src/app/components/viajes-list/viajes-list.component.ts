import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DjangoService } from 'src/app/services/django.service';

@Component({
  selector: 'app-viajes-list',
  templateUrl: './viajes-list.component.html',
  styleUrls: ['./viajes-list.component.scss'],
})
export class ViajesListComponent implements OnInit {
  @Output() viajeSeleccionadoEmitter = new EventEmitter();
  @Input() idPasajero: any;
  viajes: any[] = [];
  viajeSeleccionado: any;
  disabledButton: boolean = true;

  constructor(private djangoApi: DjangoService) {}

  ngOnInit() {
    this.listarViajes();
  }

  listarViajes() {
    this.djangoApi.listarViajes(this.idPasajero).subscribe(
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
    this.disabledButton = false;
    this.viajeSeleccionadoEmitter.emit(this.viajes[this.viajeSeleccionado]);
  }

  elegirViaje() {
    const viajeId = this.viajes[this.viajeSeleccionado].id
    this.djangoApi.agregarPasajero(this.idPasajero, viajeId).subscribe(
      (datos: any) => {
        this.viajes = this.viajes.filter(({ id }) => id !== viajeId)
        alert('Viaje reservado con exito!')
      },
      (error: any) => {
        alert(error.error);
      }
    )
  }
  
  
}


