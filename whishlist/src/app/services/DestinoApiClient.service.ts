import { HttpClientModule, HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { Injectable, forwardRef, Inject } from '@angular/core';
// import { Subject, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, APP_CONFIG, AppConfig, db } from '../app.module';
import { NuevoDestinoAction, ElegidoFavoritoAction } from '../models/destino-viajes-state.model';

@Injectable({
  providedIn: 'root'
})
export class DestinoApiClientService {
  // private destinos: DestinoViaje[] = [];
  // current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

  /**
   * constructor
   * @param store Store<AppState>
   * @param config AppConfig
   * @param http HttpClient
   */
  constructor(
    private store: Store<AppState>,
    @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
    private http: HttpClient
    ) { }

  add(d: DestinoViaje): void {
    // this.destinos.push(d);
    // this.store.dispatch(new NuevoDestinoAction(d));
    const headers: HttpHeaders = new HttpHeaders({ 'X-API-TOKEN': 'token-seguridad' });
    const req = new HttpRequest('POST', `${this.config.apiEndpoint}/my`, { nuevo: d.nombre }, { headers });
    this.http.request(req).subscribe((data: HttpResponse<{}>) => {
      if (data.status === 200) {
        this.store.dispatch(new NuevoDestinoAction(d));
        const myDb = db;
        myDb.destinos.add(d);
        console.log('todos los destinos de la db!');
        myDb.destinos.toArray().then(destinos => console.log(destinos));
      }
    });
  }

  elegir(d: DestinoViaje): void {
    /*this.destinos.forEach(x => x.setSelected(true));
    d.setSelected(true);
    this.current.next(d);*/
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }

  getById(id: string): DestinoViaje {
    return this.store.select(x => x.destinos.items.filter(d => d.id === id))[0];
  }

  /*getAll(): DestinoViaje[] {
    return this.destinos;
  }

  getById(id: string): DestinoViaje {
    return this.destinos.filter(d => d.id.toString() === id)[0];
  }

  subscribeOnChange(fn) {
    this.current.subscribe(fn);
  }
  */
}
