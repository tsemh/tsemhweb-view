import { Registro } from "./Registro";
import { Usuario } from "./usuario";

export class Categoria {
  id: number;
  usuario: Usuario;
  tipo: string;
  titulo: string;
  link: string;
  registros: Registro[];

  constructor(usuario: Usuario, tipo: string, titulo: string, link: string, registros: Registro[]) {
    this.id = 1;
    this.usuario = usuario;
    this.tipo = tipo;
    this.titulo = titulo;
    this.link = link;
    this.registros = registros;
  }
}

