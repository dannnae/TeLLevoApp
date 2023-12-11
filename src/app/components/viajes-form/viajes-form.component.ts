import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DjangoService } from 'src/app/services/django.service';
import { Geolocation, Position} from '@capacitor/geolocation';

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
      fechaHoraSalida: [null, Validators.required],
      costoPorPersona: ['', Validators.required],
    });
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['map'] && this.map) {
      this.initializeSearchBox();
      this.obtenerUbicacionActual();
    }
  }

  async obtenerUbicacionActual() {
    try {
      const posicion = await Geolocation.getCurrentPosition();
      const latitud = posicion.coords.latitude;
      const longitud = posicion.coords.longitude;
      this.putMarker({ latitud, longitud })

    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

  putMarker(viajeSeleccionado: any) {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
    this.markers = [];
    const coords = { lat: viajeSeleccionado.latitud, lng: viajeSeleccionado.longitud }

    const geocoder = new google.maps.Geocoder();
    geocoder
      .geocode({ location: coords })
      .then((response: any) => {
        if (response.results[0]) {
          const marker = new google.maps.Marker({
            position: coords,
            map: this.map,
            title: response.results[0].formatted_address
          });
          this.markers.push(marker);
          this.map.panTo(coords);
          
          this.addressInput.nativeElement.value = response.results[0].formatted_address
          this.viajeForm.get('origen')?.setValue(response.results[0].formatted_address)
        } else {
          window.alert("No results found");
        }
      })
      .catch((e: any) => window.alert("Geocoder failed due to: " + e))
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
    if (this.markers.length == 0) return;
    if (this.viajeForm.valid) {
      const viajeData = { 
        ...this.viajeForm.value, 
        tarifa: this.viajeForm.value.costoPorPersona, 
        conductor: this.idConductor, 
        fecha_hora_inicio: this.viajeForm.value.fechaHoraSalida,
        latitud: this.markers[0].position.lat(),
        longitud: this.markers[0].position.lng(),
      };

      console.log(viajeData)

      this.djangoApi.crearViaje(viajeData).subscribe(
        (response) => {
          alert('Viaje creado con exito!');
        },
        (error) => {
          console.error('error al crear el viaje:', error);
        }
      );
    }
  }
}
