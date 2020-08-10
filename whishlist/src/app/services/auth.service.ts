import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * constructor
   */
  constructor() { }

  /**
   * Ingreso de sesión
   * @param user string
   * @param password string
   * @returns boolean
   */
  login(user: string, password: string): boolean {
    if (user === 'user' && password === 'password') {
      localStorage.setItem('username', user);

      return true;
    }

    return false;
  }

  /**
   * Salir de sesión
   * @returns any
   */
  logout(): any {
    localStorage.removeItem('username');
  }

  /**
   * Obtener el usuario
   * @returns any
   */
  getUser(): any {
    return localStorage.getItem('username');
  }

  /**
   * Está logeado?
   * @returns boolean
   */
  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}
