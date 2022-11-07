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
import { Router } from '@angular/router';
import { ValidarRolUsuario } from 'src/app/validators/ValidarRolUsuario';
import { PersonaValidator } from 'src/app/validators/PersonaValitador';

@Component({
  selector: 'app-alta-persona',
  templateUrl: './alta-persona.component.html',
  styleUrls: ['./alta-persona.component.css']
})
export class AltaPersonaComponent implements OnInit {

  formulario!: FormGroup;
  mostrarRol: boolean;
  persona: Persona;
  $roles: Observable<Rol[]>;
  $provincias: Observable<Provincia[]>;
  $ciudades: Observable<Ciudad[]>;
  constructor(private personaService:PersonaService, private rolService:RolService, private provinciaService:ProvinciaService, private ciudadService:CiudadService, private formBuilder:FormBuilder, private router:Router) { 
    this.mostrarRol = false;
    this.persona = {  } as Persona;
    this.$roles = new Observable<Rol[]>();
    this.$provincias = new Observable<Provincia[]>();
    this.$ciudades = new Observable<Ciudad[]>();
  }

  ngOnInit(): void {
    this.$provincias = this.provinciaService.obtener();
    this.$roles = this.rolService.obtener();

    this.formulario = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3)
      ], [
        PersonaValidator.nombreValidator(this.personaService)
      ]],
      edad: [0, [
        Validators.required,
        Validators.min(0),
        Validators.max(120)
      ]],
      direccion: this.formBuilder.group({
        calle: ['', [
          Validators.required
        ]],
        nro: [0, [
          Validators.required,
          Validators.min(0)
        ]],
        idProvincia: ['', [
          Validators.required
        ]],
        idCiudad: ['', [
          Validators.required
        ]]
      }),
      tieneRol: [false],
      idRol: ['', [
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
      this.personaService.crear(this.persona).subscribe({
        next: (resPersona:Persona) => {
          alert('Usuario creado correctamente');
          this.router.navigate(['']);
        },
        error: (error) => {
          alert('Error al crear usuario')
        }
      })
    } else {
      alert('Ingrese campos validos')
    }
  }

}
