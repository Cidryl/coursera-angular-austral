import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservas-detalle',
  templateUrl: './reservas-detalle.component.html'
})
export class ReservasDetalleComponent implements OnInit {
  id: any;

  /**
   * constructor
   * @param route ActivatedRoute
   */
  constructor(
    private route: ActivatedRoute
  ) {
    // route.params.subscribe(params => this.id = params['id']);
  }

  /**
   * Carga inicial
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
