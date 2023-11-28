import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DjangoService } from 'src/app/services/django.service';

@Component({
  selector: 'app-viajes-form',
  templateUrl: './viajes-form.component.html',
  styleUrls: ['./viajes-form.component.scss'],
})
export class ViajesFormComponent  implements OnInit {
  @Input() idConductor: any;
  viajeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private djangoApi: DjangoService) {}

  ngOnInit() {
    this.viajeForm = this.formBuilder.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      fechaHoraSalida: ['', Validators.required],
      costoPorPersona: ['', Validators.required],
    });
  }

  crearViaje() {
    if (this.viajeForm.valid) {
      const viajeData = { ...this.viajeForm.value, tarifa: this.viajeForm.value.costoPorPersona, conductor: this.idConductor, 
        fecha_hora_inicio: this.viajeForm.value.fechaHoraSalida};

      this.djangoApi.crearViaje(viajeData).subscribe(
        (response) => {
          console.log('viaje creado:', response);
        },
        (error) => {
          console.error('error al crear el viaje:', error);
        }
      );
    } else {
      console.error('el formulario no es válido');
    }
  }
}
