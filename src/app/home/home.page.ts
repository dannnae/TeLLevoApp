import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: any = {};
  vehiculoForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.vehiculoForm = this.formBuilder.group({
      patente: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
    });

    const userData = this.router.getCurrentNavigation()?.extras.state;
  
    if (userData) {
      this.user = { ...userData };
    }
  }

  submitVehiculoForm() {
    if (this.vehiculoForm.valid) {
      const formData = this.vehiculoForm.value;
    }
  }
}
