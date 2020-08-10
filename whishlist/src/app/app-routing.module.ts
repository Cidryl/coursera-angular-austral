import { VuelosDetalleComponentComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';
import { VuelosMasInfoComponentComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import { VuelosComponentComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado.guard';
import { ProtectedComponent } from './components/protected/protected.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaDestinosComponent } from './components/destino/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino/destino-detalle/destino-detalle.component';

const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'main', component: VuelosMasInfoComponentComponent },
  { path: 'mas-info', component: VuelosMasInfoComponentComponent },
  { path: ':id', component: VuelosDetalleComponentComponent }
];

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaDestinosComponent },
  { path: 'destino/:id', component: DestinoDetalleComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [UsuarioLogueadoGuard]
  },
  {
    path: 'vuelos',
    component: VuelosComponentComponent,
    canActivate: [UsuarioLogueadoGuard],
    children: childrenRoutesVuelos
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
