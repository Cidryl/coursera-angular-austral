import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GreeterComponent } from './components/greeter/greeter.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    GreeterComponent,
    DestinoDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
