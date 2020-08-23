import { MonedasEnum } from "../enums/modeda.enum";
import { categoriasCatalogoEnum } from "../enums/categorias.enum";

export interface EmpresaInterface {
  id?: string;
  nombre: string;
  sedes: Array<EmpresaSedeInterface>;
}

interface SedeCoordenadasInterface {
  lat: string;
  lng: string;
}

interface SedeCatalogoInterface {
  id?: string;
  tipo: "p" | "s";
  nombre: string;
  descripcion: string;
  costo: number;
  moneda: MonedasEnum;
  categoria: categoriasCatalogoEnum;
  disponible: boolean;
}

interface EmpresaSedeInterface {
  id?: string;
  direccion: string;
  coordenadas: SedeCoordenadasInterface;
  catalogo: Array<SedeCatalogoInterface>;
  telefono: string;
}
