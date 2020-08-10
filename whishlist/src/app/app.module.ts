import { DestinoViaje } from './models/destino-viaje.model';
import { VuelosDetalleComponentComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';
import { VuelosMasInfoComponentComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import { VuelosMainComponentComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component.component';
import { VuelosComponentComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado.guard';
import { AuthService } from './services/auth.service';
import { ProtectedComponent } from './components/protected/protected.component';
import { LoginComponent } from './components/login/login.component';
import {
  DestinoViajesState,
  reducerDestinosViajes,
  initializeDestinosViajesState,
  DestinoViajesEffects,
  InitMyDataAction
} from './models/destino-viajes-state.model';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken, Injectable, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule as NgRxStoreModule, ActionReducerMap, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ReservasModule } from './components/reservas/reservas.module';
import { DestinoViajeComponent } from './components/destino/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/destino/lista-destinos/lista-destinos.component';
import { FormDestinoViajeComponent } from './components/destino/form-destino-viaje/form-destino-viaje.component';
import { HttpClientModule, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import Dexie from 'dexie';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EspiameDirective } from './directives/espiame.directive';
import { TrackearClickDirective } from './directives/trackear-click.directive';

export interface AppConfig {
  apiEndpoint: string;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// Redux init

export interface AppState {
  destinos: DestinoViajesState;
}

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};

const reducersInitialState = {
  destinos: initializeDestinosViajesState()
};

// Redux fin init

// app init
export function init_app(appLoadService: AppLoadService): () => Promise<any> {
  return () => appLoadService.initializeDestinosViajesState();
}

@Injectable()
class AppLoadService {
  /**
   * constructor
   * @param store Store<AppState>
   * @param http HttpClient
   */
  constructor(private store: Store<AppState>, private http: HttpClient) {}

  async initializeDestinosViajesState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'X-API-TOKEN': 'token-seguridad' });
    const req = new HttpRequest('GET', `${APP_CONFIG_VALUE.apiEndpoint}/my`, { headers });
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction(response.body));
  }
}

export class Translation {
  constructor(public id: number, public lang: string, public key: string, public value: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class MyDatabase extends Dexie {
  destinos: Dexie.Table<DestinoViaje, number>;
  translations: Dexie.Table<Translation, number>;

  constructor() {
    super('MyDatabase');

    this.version(1).stores({
      destinos: '++id, nombre, imagenUrl',
    });

    this.version(2).stores({
      destinos: '++id, nombre, imagenUrl',
      translations: '++id, lang, key, value'
    });
  }
}

export const db = new MyDatabase();

class TranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    const promise = db.translations
      .where('lang')
      .equals(lang)
      .toArray()
      .then(results => {
        if (results.length === 0) {
          return this.http.get<Translation[]>(`${APP_CONFIG_VALUE.apiEndpoint}/api/translation?lang=${lang}`)
            .toPromise()
            .then(apiResults => {
              db.translations.bulkAdd(apiResults);
              return apiResults;
            });
        }

        return results;
      })
      .then((traducciones) => {
        console.log('traducciones cargadas: ');
        console.log(traducciones);
        return traducciones;
      })
      .then((traducciones) => {
        return traducciones.map((t) => ({ [t.key]: t.value }));
      });

    return from(promise)
      .pipe(flatMap((elems) => from(elems)));
  }
}

function HttpLoaderFactory(http: HttpClient) {
  return new TranslationLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoViajeComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponentComponent,
    VuelosMainComponentComponent,
    VuelosMasInfoComponentComponent,
    VuelosDetalleComponentComponent,
    EspiameDirective,
    TrackearClickDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState }),
    EffectsModule.forRoot([DestinoViajesEffects]),
    StoreDevtoolsModule.instrument({ // https://ngrx.io/guide/store-devtools
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ReservasModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslationLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    NgxMapboxGLModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    UsuarioLogueadoGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },
    MyDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
