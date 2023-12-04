import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfilConductorComponent } from '../components/perfil-conductor/perfil-conductor.component';
import { PerfilPasajeroComponent } from '../components/perfil-pasajero/perfil-pasajero.component';
import { IonicModule } from '@ionic/angular';
import { PerfilPageRoutingModule } from './perfil-routing.module';
import { PerfilPage } from './perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule
  ],
  declarations: [PerfilPage, PerfilConductorComponent, PerfilPasajeroComponent]
})
export class PerfilPageModule {}
