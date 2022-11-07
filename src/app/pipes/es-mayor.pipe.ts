import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'esMayor'
})
export class EsMayorPipe implements PipeTransform {

  transform(value: number, condicion: number): string {
    return value > condicion ? 'Es mayor de edad' : 'No es mayor de edad';
  }

}
