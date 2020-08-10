import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservasApiClientService {
  /**
   * constructor
   */
  constructor() { }

  /**
   * Obtener todas las reservas
   * @returns any
   */
  getAll(): any {
    return [{ id: 1, name: 'uno' }, { id: 2, name: 'dos' }];
  }
}
