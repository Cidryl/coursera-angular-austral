import { AppState } from 'src/app/app.module';
import { DestinoApiClientService } from './../../../services/DestinoApiClient.service';
import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

/*
export class DestinosApiClientViejo {
  getById(id: string): DestinoViaje {
    console.log('llamado por la clase vieja ' +  id);
    return null;
  }
}

interface AppConfig {
  apiEndpoint: string;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'mi_api.com'
};

const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class DestinosApiClientDecorated extends DestinoApiClientService {
  constructor(@Inject(APP_CONFIG) private config: AppConfig, store: Store<AppState>) {
    super(store);
  }

  getById(id: string): DestinoViaje {
    console.log('llamado por la clase decorada!');
    console.log('config: ' + this.config.apiEndpoint);

    return super.getById(id);
  }
}
*/

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  providers: [
    DestinoApiClientService,
    /*{ provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    { provide: DestinoApiClientService, useClass: DestinosApiClientDecorated },
    { provide: DestinosApiClientViejo, useExisting: DestinoApiClientService }
    */
  ]
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;
  style = {
    sources: {
      world: {
        type: 'geojson',
        data: 'https://raw.githubercontent.com/johan/world.geo.json/master/countries.geo.json'
      }
    },
    version: 8,
    layers: [{
      id: 'countries',
      type: 'fill',
      source: 'world',
      layout: {},
      paint: {
        'fill-color': '#6f788a'
      }
    }]
  };

  /**
   * constructor
   * @param route ActivatedRoute
   * @param destinoApiClient DestinoApiClientService
   */
  constructor(
    private route: ActivatedRoute,
    private destinoApiClient: DestinoApiClientService
  ) { }

  /**
   * Carga inicial
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinoApiClient.getById(id);
  }

}
