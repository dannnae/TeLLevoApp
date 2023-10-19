import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  nombre!: string;
  password1!: string;
  password2!: string;

  constructor() { }

  ngOnInit() {
  }

  guardar() {
  }
}
