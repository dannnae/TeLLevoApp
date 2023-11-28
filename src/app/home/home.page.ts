import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DjangoService } from '../services/django.service';


declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  user: any = {};
  @ViewChild('mapContainer', { static: false, read: ElementRef }) mapContainer!: ElementRef | undefined;

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    const userData = this.router.getCurrentNavigation()?.extras.state;

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
      const map = new google.maps.Map(mapElement, {
        center: { lat: -33.43291633792561, lng: -70.61487221648964 },
        zoom: 20,
      });
      const marker = new google.maps.Marker({
        position: { lat: -33.43291633792561, lng: -70.61487221648964 },
        map: map,
        title: 'ubicación inicial',
      });
    }
  }
}
