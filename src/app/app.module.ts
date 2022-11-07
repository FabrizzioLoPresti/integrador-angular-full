import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoPersonaComponent } from './persona/listado-persona/listado-persona.component';
import { AltaPersonaComponent } from './persona/alta-persona/alta-persona.component';
import { BajaPersonaComponent } from './persona/baja-persona/baja-persona.component';
import { EditarPersonaComponent } from './persona/editar-persona/editar-persona.component';
import { EsMayorPipe } from './pipes/es-mayor.pipe';
import { CambiarColorDirective } from './directives/cambiar-color.directive';
import { InyeccionContenidoComponent } from './inyeccion-contenido/inyeccion-contenido.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoPersonaComponent,
    AltaPersonaComponent,
    BajaPersonaComponent,
    EditarPersonaComponent,
    EsMayorPipe,
    CambiarColorDirective,
    InyeccionContenidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
