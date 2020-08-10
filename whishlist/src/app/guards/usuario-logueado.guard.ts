import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogueadoGuard implements CanActivate {
  /**
   * constructor
   * @param auth AuthService
   */
  constructor(
    private auth: AuthService
  ) {}

  /**
   * Puede activar el guardian
   * @param next ActivatedRouteSnapshot
   * @param state RouterStateSnapshot
   * @returns Observable<boolean> | Promise<boolean> | boolean
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.auth.isLoggedIn();
    console.log('canActivate', isLoggedIn);

    return isLoggedIn;
  }
}
