import { Provincia } from "./Provincia"
import { Ciudad } from './Ciudad'
import { Rol } from "./Rol"

export interface Persona {
  id: string,
  nombre: string,
  edad: number,
  direccion: {
    calle: string,
    nro: number,
    idProvincia: string,
    provincia?: Provincia,
    idCiudad: string,
    ciudad?: Ciudad
  },
  idRol: string,
  rol?: Rol
}