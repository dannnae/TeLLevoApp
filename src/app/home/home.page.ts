import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: any = {}; // Declarar una variable para almacenar los datos del usuario
  

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const userData = this.router.getCurrentNavigation()?.extras.state;
  
    if (userData) {
      this.user = {...userData };
    }
  }
  
}