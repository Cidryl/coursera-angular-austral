import { Component, OnInit } from '@angular/core';
import { ReservasApiClientService } from 'src/app/services/reservas-api-client.service';

@Component({
  selector: 'app-reservas-listado',
  templateUrl: './reservas-listado.component.html'
})
export class ReservasListadoComponent implements OnInit {

  /**
   * constructor
   * @param api ReservasApiClientService
   */
  constructor(
    public api: ReservasApiClientService
  ) { }

  /**
   * Carga inicial
   */
  ngOnInit(): void {
  }
}
