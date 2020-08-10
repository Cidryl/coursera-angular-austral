import { ReservasListadoComponent } from './reservas-listado/reservas-listado.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasRoutingModule } from './reservas-routing.module';
import { ReservasDetalleComponent } from './reservas-detalle/reservas-detalle.component';
import { ReservasApiClientService } from 'src/app/services/reservas-api-client.service';

@NgModule({
  imports: [
    CommonModule,
    ReservasRoutingModule
  ],
  declarations: [
    ReservasListadoComponent,
    ReservasDetalleComponent
  ],
  providers: [
    ReservasApiClientService
  ]
})
export class ReservasModule { }