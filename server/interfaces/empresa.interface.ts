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

interface CatalogoInterface {
  id?: string;
  tipo: "p" | "s";
  nombre: string;
  descripcion: string;
  costo: number;
  id_moneda: number;
  id_categoria: number;
  id_empresa: number;
}

interface EmpresaSedeInterface {
  id?: string;
  direccion: string;
  coordenadas?: SedeCoordenadasInterface;
  telefono: string;
}
