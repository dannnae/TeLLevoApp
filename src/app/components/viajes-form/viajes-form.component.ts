import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DjangoService } from 'src/app/services/django.service';

declare var google: any;

@Component({
  selector: 'app-viajes-form',
  templateUrl: './viajes-form.component.html',
  styleUrls: ['./viajes-form.component.scss'],
})
export class ViajesFormComponent  implements OnInit, OnChanges {
  @ViewChild('addressInput', { static: false, read: ElementRef }) addressInput!: ElementRef;
  @Input() idConductor: any;
  @Input() map: any;
  viajeForm!: FormGroup;
  searchBox: any;
  markers: any[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private djangoApi: DjangoService) {}

  ngOnInit() {
    this.viajeForm = this.formBuilder.group({
      origen: ['', Validators.required],
      fechaHoraSalida: ['', Validators.required],
      costoPorPersona: ['', Validators.required],
    });
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['map'] && this.map) {
      this.initializeSearchBox();
    }
  }

  initializeSearchBox() {
    this.searchBox = new google.maps.places.SearchBox(this.addressInput?.nativeElement);
    this.map.addListener("bounds_changed", () => {
      this.searchBox.setBounds(this.map.getBounds());
    });

    this.searchBox.addListener("places_changed", () => {
      const places = this.searchBox.getPlaces();
  
      if (places.length == 0) {
        return;
      }
  
      // Clear out the old markers

      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
      this.markers = [];
  
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
  
      places.forEach((place: any) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
  
        const icon = {
          url: place.icon as string,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
  
        // Create a marker for each place.
        this.markers.push(
          new google.maps.Marker({
            map: this.map,
            icon: icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
  
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    });
  }

  crearViaje() {
    console.log(this.markers)
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
