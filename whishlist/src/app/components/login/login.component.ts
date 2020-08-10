import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  mensajeError: string;

  /**
   * constructor
   * @param auth AuthService
   */
  constructor(
    public auth: AuthService
  ) {
    this.mensajeError = '';
  }

  /**
   * Carga incial
   */
  ngOnInit(): void {
  }

  /**
   * Ingreso de sesión
   * @param username string
   * @param password string
   * @returns false
   */
  login(username: string, password: string): boolean {
    this.mensajeError = '';

    if (!this.auth.login(username, password)) {
      this.mensajeError = 'Login incorrecto.';

      setTimeout(() => {
        this.mensajeError = '';
      }, 2500);
    }

    return false;
  }

  /**
   * Salir de sesión
   * @returns false
   */
  logout(): boolean {
    this.auth.logout();

    return false;
  }
}
