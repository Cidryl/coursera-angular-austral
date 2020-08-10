import { v4 as uuid } from 'uuid';

export class DestinoViaje {
  id = uuid();
  selected: boolean;
  servicios: string[];

  /**
   * constructor
   * @param nombre string
   * @param url string
   */
  constructor(public nombre: string, public url: string, public votes: number = 0) {
    this.servicios = ['pileta', 'desayuno'];
  }

  /**
   * Regresa la variable selected
   * @returns boolean
   */
  isSelected(): boolean {
    return this.selected;
  }

  /**
   * Setea la variable seleted
   * @param s boolean
   */
  setSelected(s: boolean): void {
    this.selected = s;
  }

  voteDown(): void {
    this.votes--;
  }

  voteUp(): void {
    this.votes++;
  }
}
