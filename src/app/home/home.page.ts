import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  user: any = {};
  map: any;
  marker: any;
  @ViewChild('mapContainer', { static: false, read: ElementRef }) mapContainer!: ElementRef | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    const userData = this.router.getCurrentNavigation()?.extras.state;
    console.log(userData)
    if (userData) {
      this.user = { ...userData };
    }
  }

  ngAfterViewInit() {
    if (this.mapContainer) {
      this.initMap();
    }
  }

  initMap() {
    const mapElement = this.mapContainer?.nativeElement;
    if (mapElement) {
      this.map = new google.maps.Map(mapElement, {
        center: { lat: -33.43291633792561, lng: -70.61487221648964 },
        zoom: 20,
      });
    }
  }

  putMarker(viajeSeleccionado: any) {
    if (this.marker) {
      this.marker.setMap(null);
    }
    this.marker = new google.maps.Marker({
      position: { lat: viajeSeleccionado.latitud, lng: viajeSeleccionado.longitud },
      map: this.map,
      title: viajeSeleccionado.origen,
    });
    this.map.panTo({ lat: viajeSeleccionado.latitud, lng: viajeSeleccionado.longitud });
  }

  openPerfil() {
    this.router.navigate(['/perfil'], { state: this.user });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/inicio']);
  }
}

