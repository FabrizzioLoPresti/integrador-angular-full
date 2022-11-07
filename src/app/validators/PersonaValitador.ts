import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { PersonaService } from '../services/persona.service';

export class PersonaValidator {
  static nombreValidator(personaService:PersonaService): AsyncValidatorFn {
    return (control:AbstractControl): Observable<ValidationErrors | null> => {
      return personaService
        .checkIfNameExists(control.value)
        .pipe(
          map((result:boolean) => {
            return result ? {nameAlreadyExists:true} : null
          })
        )
    }
  }
}