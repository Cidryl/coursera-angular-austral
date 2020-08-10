import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { AppState } from 'src/app/app.module';
import { Store } from '@ngrx/store';
import { VoteUpAction, VoteDownAction } from 'src/app/models/destino-viajes-state.model';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  animations: [
    trigger('esFavorito', [
      state('estadoFavorito', style({
        backgroundColor: 'PaleTurquoise'
      })),
      state('estadoNoFavorito', style({
        backgroundColor: 'WhiteSmoke'
      })),
      transition('estadoNoFavorito => estadoFavorito', [
        animate('3s')
      ]),
      transition('estadoFavorito => estadoNoFavorito', [
        animate('1s')
      ]),
    ]),
  ]
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino: DestinoViaje;
  // tslint:disable-next-line: no-input-rename
  @Input('idx') posicion: number;
  // Se le asigna al tag app-destinodiaje la siguiente clase
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked: EventEmitter<DestinoViaje>;

  /**
   * constructor
   */
  constructor(
    private store: Store<AppState>
  ) {
    this.clicked = new EventEmitter();
  }

  /**
   * Carga inicial
   */
  ngOnInit(): void {
  }

  /**
   * Emitir evento al padre
   * @returns boolean
   */
  ir(): boolean {
    this.clicked.emit(this.destino);

    return false;
  }

  voteup(): boolean {
    this.store.dispatch(new VoteUpAction(this.destino));
    return false;
  }

  votedown(): boolean {
    this.store.dispatch(new VoteDownAction(this.destino));
    return false;
  }
}
