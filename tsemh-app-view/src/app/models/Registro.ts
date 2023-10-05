export class Registro {
  id: number;
  tipo: string;
  nome: string;
  link: string;
  descricao: string;
  dataCriacao: Date;
  destaque: boolean;

  constructor() {
    this.id = 0;
    this.tipo = '';
    this.nome = '';
    this.link = '';
    this.descricao = '';
    this.dataCriacao = new Date('');
    this.destaque = false;
  }
  
}