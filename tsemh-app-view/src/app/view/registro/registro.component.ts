import { UtilService } from 'src/app/service/util.service';
import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria';
import { Registro } from 'src/app/models/Registro';
import { RegistroService } from 'src/app/service/registro.service';

@Component({
  selector: 'tsemh-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent  implements OnInit {

  public registros: Registro[] = [];
  public categorias: Categoria[] = [];
  private categoriaSelecionada: number = 0;
  public page: number = 1;

  public tituloMain: string = "";
  public tipoSelecionado: string = "";
  public tiposDeRegistro: string[] = [];

  constructor(private registroService: RegistroService,
              private utilService: UtilService) { }

  ngOnInit(): void {
    this.recuperaTipoSelecionado()
    this.defineTipo()
    this.carregarTiposDeRegistro();
    this.carregaRegistroPorTipo();
    this.transformaEmTitulo();
  }

  private recuperaTipoSelecionado(): void {
    const tipoArmazenado = localStorage.getItem('tipoArmazenado');
    if (this.tipoSelecionado === null && tipoArmazenado || this.tipoSelecionado === "" && tipoArmazenado) {
      this.utilService.setRegistroTipo(tipoArmazenado);
    }
  } 

  transformaEmTitulo(){
    this.tituloMain = `${this.utilService.getRegistroTipo()}s`;
  }
  defineTipo(){
    this.tipoSelecionado = this.utilService.getRegistroTipo();
  }
  carregarTiposDeRegistro(): void {
    this.registroService.getTiposDeRegistro().subscribe(
      tipos => {
        this.tiposDeRegistro = tipos;
      },
      error => {
        console.error(error);
        // Adicione tratamento de erro adequado aqui
      }
    );
  }
  atualizarCategoria(idCategoria: number) {
    this.categoriaSelecionada = idCategoria;
    this.carregaRegistroPelaCategoria();
  }

  selecionarRegistro(idRegistro: number) {
    this.utilService.setRegistroId(idRegistro)
  }

  redirecionaPara(url: string): void {
    this.utilService.redirecionaPara(url);
  }

  carregaRegistroPorTipo() {
    this.registroService.getByTipo(this.utilService.getRegistroTipo()).subscribe(
      (projeto: Registro[]) => {
        this.registros = projeto;
      },
      (e: any) => {
        console.error(e);
      }
    );
  }

  carregaRegistroPelaCategoria() {
    this.registroService.getRegistroByCategoria(this.categoriaSelecionada).subscribe(
      (registro: Registro[]) => {
        this.registros = registro;
        this.page = 1;
      },
      (e: any) => {
        console.error(e);
      }
    );
  }
  
}
