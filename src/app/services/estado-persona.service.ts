import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoPersonaService {

  private subject: Subject<string>;
  constructor() { 
    this.subject = new Subject<string>();
  }

  cambiarEstado(valor:string) {
    this.subject.next(valor);
  }

  estadoCambio(): Observable<string> {
    return this.subject.asObservable();
  }
}
