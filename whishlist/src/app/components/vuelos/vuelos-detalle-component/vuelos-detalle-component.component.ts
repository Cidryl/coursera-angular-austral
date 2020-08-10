import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vuelos-detalle-component',
  templateUrl: './vuelos-detalle-component.component.html'
})
export class VuelosDetalleComponentComponent implements OnInit {
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
