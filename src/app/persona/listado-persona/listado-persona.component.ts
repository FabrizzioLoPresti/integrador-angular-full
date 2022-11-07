import { Component, OnInit, OnDestroy } from '@angular/core';

import { Persona } from 'src/app/models/Persona';
import { Rol } from 'src/app/models/Rol';
import { Provincia } from 'src/app/models/Provincia';
import { Ciudad } from 'src/app/models/Ciudad';
import { PersonaService } from 'src/app/services/persona.service';
import { RolService } from 'src/app/services/rol.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { CiudadService } from 'src/app/services/ciudad.service';
import { EstadoPersonaService } from 'src/app/services/estado-persona.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-persona',
  templateUrl: './listado-persona.component.html',
  styleUrls: ['./listado-persona.component.css']
})
export class ListadoPersonaComponent implements OnInit, OnDestroy {

  personas: Persona[];
  fecha: Date = new Date();
  private subscription;
  $valorObservable: Observable<string>;
  constructor(private personaService:PersonaService, private rolService:RolService, private provinciaService:ProvinciaService, private ciudadService:CiudadService, private estadoPersona:EstadoPersonaService, private router:Router) { 
    this.personas = [];
    this.subscription = new Subscription();
    this.$valorObservable = new Observable<string>();
  }

  ngOnInit(): void {
    this.cargarListado();

    this.$valorObservable = this.estadoPersona.estadoCambio();
    this.$valorObservable.subscribe({
      next: (valor:string) => {
        alert(valor);
        this.cargarListado();
      }
    })    
  }

  cargarListado(): void {
    this.subscription.add(
      this.personaService.obtener().subscribe({
        next: (resPersonas:Persona[]) => {
          this.personas = resPersonas;
          this.personas.forEach(persona => {
            this.rolService.obtenerById(persona.idRol).subscribe({
              next: (resRol:Rol) => {
                persona.rol = resRol
              }
            })
            this.provinciaService.obtenerById(persona.direccion.idProvincia).subscribe({
              next: (resProvincia:Provincia) => {
                persona.direccion.provincia = resProvincia
              }
            })
            this.ciudadService.obtenerById(persona.direccion.idCiudad).subscribe({
              next: (resCiudad:Ciudad) => {
                persona.direccion.ciudad = resCiudad
              }
            })
          })
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  editar(id:string): void {
    this.router.navigate([`editar/${id}`]);
  }

}
