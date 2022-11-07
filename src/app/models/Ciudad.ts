import { Provincia } from "./Provincia";

export interface Ciudad {
  id: string,
  nombre: string,
  idProvincia: string,
  provincia: Provincia
}