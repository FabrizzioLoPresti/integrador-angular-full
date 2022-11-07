import { Component, Input, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoPersonaService } from 'src/app/services/estado-persona.service';

@Component({
  selector: 'app-baja-persona',
  templateUrl: './baja-persona.component.html',
  styleUrls: ['./baja-persona.component.css']
})
export class BajaPersonaComponent implements OnInit {

  @Input() id:string;
  constructor(private personaService:PersonaService, private estadoPersona:EstadoPersonaService) { 
    this.id = '';
  }

  ngOnInit(): void {
  }

  eliminar(): void {
    const resultado = confirm('Seguro que desea eliminar el usuario');
    if(resultado) {
      this.personaService.eliminar(this.id).subscribe({
        next: () => {
          this.estadoPersona.cambiarEstado('Usuario eliminado correctamente')
        },
        error: (error) => {
          this.estadoPersona.cambiarEstado('Error al elimar usuario')
        }
      })
    }
  }

}
