import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../models/Rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private API_URL:string = 'https://633345b1573c03ab0b5b5964.mockapi.io/roles';
  constructor(private http:HttpClient) { }

  obtener(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.API_URL);
  }

  obtenerById(id:string): Observable<Rol> {
    return this.http.get<Rol>(`${this.API_URL}/${id}`);
  }

}
