import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCambiarColor]'
})
export class CambiarColorDirective {

  private readonly colores = [
    'red',
    'green',
    'blue',
    'pink'
  ]
  constructor(private elementRef:ElementRef) { }

  @HostListener('click')
  onClick() {
    const indexColor = Math.round( Math.random() * ( this.colores.length - 1 ) );
    this.elementRef.nativeElement.style.color = this.colores[indexColor]
  }
  
}
