import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/Persona';
import { Rol } from 'src/app/models/Rol';
import { Provincia } from 'src/app/models/Provincia';
import { Ciudad } from 'src/app/models/Ciudad';
import { PersonaService } from 'src/app/services/persona.service';
import { RolService } from 'src/app/services/rol.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { CiudadService } from 'src/app/services/ciudad.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidarRolUsuario } from 'src/app/validators/ValidarRolUsuario';
import { PersonaValidator } from 'src/app/validators/PersonaValitador';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {

  formulario!: FormGroup;
  mostrarRol: boolean;
  persona: Persona;
  id: string;
  $roles: Observable<Rol[]>;
  $provincias: Observable<Provincia[]>;
  $ciudades: Observable<Ciudad[]>;
  constructor(private personaService:PersonaService, private rolService:RolService, private provinciaService:ProvinciaService, private ciudadService:CiudadService, private formBuilder:FormBuilder, private router:Router, private activatedRoute:ActivatedRoute) { 
    this.mostrarRol = true;
    this.persona = {  } as Persona;
    this.id = '';
    this.$roles = new Observable<Rol[]>();
    this.$provincias = new Observable<Provincia[]>();
    this.$ciudades = new Observable<Ciudad[]>();
  }

  ngOnInit(): void {
     this.activatedRoute.params.subscribe({
      next: (params) => {
        this.id = params['id'];
        this.personaService.obtenerById(this.id).subscribe({
          next: (resPersona:Persona) => {
            this.persona = resPersona;
            this.$provincias = this.provinciaService.obtener();
            this.$ciudades = this.ciudadService.obtener(this.persona.direccion.idProvincia);
            this.$roles = this.rolService.obtener();
            this.cargarDatos();
          }
        })
      }
     })
  }

  cargarDatos(): void {
    this.$provincias = this.provinciaService.obtener();
    this.$roles = this.rolService.obtener();

    this.formulario = this.formBuilder.group({
      nombre: [this.persona.nombre, [
        Validators.required,
        Validators.minLength(3)
      ], [
        PersonaValidator.nombreValidator(this.personaService)
      ]],
      edad: [this.persona.edad, [
        Validators.required,
        Validators.min(0),
        Validators.max(120)
      ]],
      direccion: this.formBuilder.group({
        calle: [this.persona.direccion.calle, [
          Validators.required
        ]],
        nro: [this.persona.direccion.nro, [
          Validators.required,
          Validators.min(0)
        ]],
        idProvincia: [this.persona.direccion.idProvincia, [
          Validators.required
        ]],
        idCiudad: [this.persona.direccion.idCiudad, [
          Validators.required
        ]]
      }),
      tieneRol: [true],
      idRol: [this.persona.idRol, [
        Validators.required,
        ValidarRolUsuario
      ]] // Propio validator
    })

    this.formulario.controls['direccion'].get('idProvincia')?.valueChanges.subscribe((valor) => {
      this.$ciudades = this.ciudadService.obtener(valor);
    })

    this.formulario.controls['tieneRol'].valueChanges.subscribe((valor) => {
      this.mostrarRol = valor;
    })
  }

  cancelar(): void {
    const resultado = confirm('Desea cancelar el registro?');
    if(resultado) {
      this.router.navigate(['']);
    }
  }

  enviar(): void {
    if(this.formulario.valid) {
      this.persona = this.formulario.value;
      this.persona.id = this.id;
      this.personaService.editar(this.persona).subscribe({
        next: (resPersona:Persona) => {
          alert('Usuario editado correctamente');
          this.router.navigate(['']);
        },
        error: (error) => {
          alert('Error al actualizar usuario');
        }
      })
    } else {
      alert('Ingrese campos validos')
    }
  }

}
