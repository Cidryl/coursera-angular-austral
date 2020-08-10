import { HttpClientModule } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { Injectable, Type } from '@angular/core';

// Estado global
export interface DestinoViajesState {
  items: DestinoViaje[];
  loading: boolean;
  favorito: DestinoViaje;
}

// Inicializar el estado
export const initializeDestinosViajesState = (): DestinoViajesState => {
  return {
    items: [],
    loading: false,
    favorito: null
  };
};

// Acciones que modifican el estado que disparan un cambio de estado
export enum DestinosViajesActionTypes {
  NUEVO_DESTINO = '[Destinos viajes] Nuevo',
  ELEGIDO_FAVORITO = '[Destinos viajes] Favorito',
  VOTE_UP = '[Destinos viajes] Vote up',
  VOTE_DOWN = '[Destinos viajes] Vote down',
  INIT_MY_DATA = '[Destinos viajes] Init my data'
}

export class NuevoDestinoAction implements Action {
  type = DestinosViajesActionTypes.NUEVO_DESTINO;

  constructor(public destino: DestinoViaje) {}
}

export class ElegidoFavoritoAction implements Action {
  type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;

  constructor(public destino: DestinoViaje) {}
}

export class VoteUpAction implements Action {
  type = DestinosViajesActionTypes.VOTE_UP;

  constructor(public destino: DestinoViaje) {}
}

export class VoteDownAction implements Action {
  type = DestinosViajesActionTypes.VOTE_DOWN;

  constructor(public destino: DestinoViaje) {}
}

export class InitMyDataAction implements Action {
  type = DestinosViajesActionTypes.INIT_MY_DATA;

  constructor(public destinos: string[]) {}
}

// Agrupar todos los tipos de datos de las acciones
// el | termina siendo la unión de variables
export type DestinoViajesActions =
  NuevoDestinoAction | ElegidoFavoritoAction | VoteUpAction | VoteDownAction | InitMyDataAction;

// Redux - Reductores
// Cada reduce recibe el estado anterior del sistema y la acción que dispara
// luego modifica el esatdo
export function reducerDestinosViajes(
  state: DestinoViajesState,
  action: DestinoViajesActions
): DestinoViajesState {
  if (!action || !action.type) {
    return state;
  }

  switch (action.type) {
    case DestinosViajesActionTypes.NUEVO_DESTINO: {
      return {
        ...state,
        items: [...state.items, (action as NuevoDestinoAction).destino]
      };
    }

    case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
      const fav: DestinoViaje = (action as ElegidoFavoritoAction).destino;
      const nuevo: DestinoViaje = new DestinoViaje(fav.nombre, fav.url);
      nuevo.setSelected(true);

      const items: DestinoViaje[] = state.items.map(x => {
        const aux = new DestinoViaje(x.nombre, x.url);
        aux.votes = x.votes;
        aux.setSelected(fav.id === x.id);

        return aux;
      });

      return {
        ...state,
        items,
        favorito: nuevo
      };
    }

    case DestinosViajesActionTypes.VOTE_UP: {
      const d: DestinoViaje = (action as ElegidoFavoritoAction).destino;

      const items: DestinoViaje[] = state.items.map(x => {
        const aux = new DestinoViaje(x.nombre, x.url);
        aux.votes = x.votes;
        aux.setSelected(x.isSelected());

        if (d.id === x.id) {
          aux.voteUp();
        }

        return aux;
      });

      return {
        ...state,
        items
      };
    }

    case DestinosViajesActionTypes.VOTE_DOWN: {
      const d: DestinoViaje = (action as ElegidoFavoritoAction).destino;

      const items: DestinoViaje[] = state.items.map(x => {
        const aux = new DestinoViaje(x.nombre, x.url);
        aux.votes = x.votes;
        aux.setSelected(x.isSelected());

        if (d.id === x.id) {
          aux.voteDown();
        }

        return aux;
      });

      return {
        ...state,
        items
      };
    }

    case DestinosViajesActionTypes.INIT_MY_DATA: {
      const destinos: string[] = (action as InitMyDataAction).destinos;

      return {
        ...state,
        items: destinos.map((d) => new DestinoViaje(d, ''))
      };
    }

    default:
      return state;
  }
}

// Acción es pasada a los Effect
// Registrar una acción por consecuencia de una acción
@Injectable()
export class DestinoViajesEffects {
  @Effect()
  nuevoAgregado$: Observable<Action> = this.actions$.pipe(
    ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
    map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
  );

  constructor(public actions$: Actions) {}
}
