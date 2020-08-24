import { Client } from "pg";
import { environment } from "./environment.service";

const config = {
  user: environment.PGUSER,
  host: environment.PGHOST,
  port: environment.PGPORT,
  password: environment.PGPASSWORD,
  database: environment.PGDATABASE,
};

export const queryBD = async (consulta: string): Promise<any> => {
  try {
    const client = crearCliente();
    client.connect();
    const resp = await client.query(consulta);
    desconectarCliente(client);
    return resp.rows;
  } catch (err) {
    return err;
  }
};

const desconectarCliente = (client: any) => {
  client.end((err: any) => {
    if (err) {
      console.log(`No se puedo desconectar el cliente ${JSON.stringify(err)}`);
    }
  });
};

const crearCliente = () => {
  return new Client(config);
};
