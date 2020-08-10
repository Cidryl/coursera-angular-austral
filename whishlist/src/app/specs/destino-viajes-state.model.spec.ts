import { DestinoViaje } from '../models/destino-viaje.model';
import {
  initializeDestinosViajesState,
  InitMyDataAction,
  reducerDestinosViajes,
  NuevoDestinoAction,
  DestinoViajesState
} from '../models/destino-viajes-state.model';


describe('reducerDestinosViajes', () => {
  it('should reduce init data', () => {
    // setup
    const prevState: DestinoViajesState = initializeDestinosViajesState();
    const action: InitMyDataAction = new InitMyDataAction(['destino 1', 'destino 2']);

    // action (sobre el modelo)
    const newState: DestinoViajesState = reducerDestinosViajes(prevState, action);

    // assert
    expect(newState.items.length).toEqual(2);
    expect(newState.items[0].nombre).toEqual('destino 1');

    // tear down
    // borrar lo que se guardó en una tabla si es necesario
  });

  it('should reduce new item added', () => {
    const prevState: DestinoViajesState = initializeDestinosViajesState();
    const action: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('barcelona', 'url'));
    const newState: DestinoViajesState = reducerDestinosViajes(prevState, action);

    expect(newState.items.length).toEqual(1);
    expect(newState.items[0].nombre).toEqual('barcelona');
  });
});
