import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from 'src/app/models/destino-viajes-state.model';
import { DestinoApiClientService } from 'src/app/services/DestinoApiClient.service';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  providers: [DestinoApiClientService]
})
export class ListaDestinosComponent implements OnInit {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];
  all: DestinoViaje[];

  /**
   * constructor
   * @param destinosApiClient DestinoApiClientService
   * @param store Store<AppState>
   */
  constructor(
    public destinosApiClient: DestinoApiClientService,
    private store: Store<AppState>
  ) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destinos.favorito)
      .subscribe(data => {
        if (data !== null) {
          this.updates.push(`Se ha elegido a ${data.nombre}`);
        }
      });

    this.store.select(state => state.destinos.items).subscribe(items => this.all = items);
  }

  /**
   * Carga inicial
   */
  ngOnInit(): void {
  }

  /**
   * guardar viaje
   * @param destino DestinoViaje
   */
  agregado(destino: DestinoViaje): void {
    this.destinosApiClient.add(destino);
    this.onItemAdded.emit(destino);
  }

  /**
   * elegido
   * @param destino DestinoViaje
   */
  elegido(destino: DestinoViaje): void {
    this.destinosApiClient.elegir(destino);
  }
}
