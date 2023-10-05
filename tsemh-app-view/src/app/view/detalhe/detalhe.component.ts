import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/models/Registro';
import { RegistroService } from 'src/app/service/registro.service';
import { formatDate, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'tsemh-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {

  registro: Registro = {} as Registro;
  paragrafos: string[] = [];
  dataCriacao: Date | null = null;
  dataCriacaoFormatada: string = '';
  private idSelecionado: number = 0;

  constructor(
    private registroService: RegistroService,
    private utilService: UtilService
  ) {}
  
  ngOnInit(): void {
    registerLocaleData(localePt);
    this.recuperaIdSelecionado();
    this.defineId();
    this.carregaRegistro();
  }

  private recuperaIdSelecionado(): void {
    const idArmazenado = localStorage.getItem('idArmazenado');
    if (this.idSelecionado === null && idArmazenado || this.idSelecionado === 0 && idArmazenado) {
      const idParseado = parseInt(idArmazenado);
      this.utilService.setRegistroId(idParseado);
    }
  } 

  defineId(){
    this.idSelecionado = this.utilService.getRegistroId();
  }

  carregaRegistro(): void {
    this.registroService.getById(this.idSelecionado).subscribe(
      (registro: Registro) => {
        this.registro = registro;
        this.formataData();
        this.separaParagrafos();
      },
      (error: any) => {
        console.error(error);
        if (this.idSelecionado === 0) {
          this.utilService.erroNaoEncontrado();
        }
      }
    );
  }

  formataData(): void {
    this.dataCriacao = new Date(this.registro.dataCriacao);
    this.dataCriacaoFormatada = formatDate(this.dataCriacao, 'yyyy MMMM dd, HH:mm \'h\'', 'en-US');
  }

  separaParagrafos(): void {
    this.paragrafos = this.utilService.separaParagrafos(this.registro.descricao);
  }
}
