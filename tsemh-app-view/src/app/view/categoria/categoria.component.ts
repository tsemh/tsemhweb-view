import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria } from '../../models/Categoria';
import { CategoriaService } from '../../service/categoria.service';
import { Registro } from 'src/app/models/Registro';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'tsemh-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  @Input() tituloMain: string = "";
  @Input() tipo: string = "";
  @Input() registro: Registro[] = [];
  @Input() categorias: Categoria[] = [];

  @Output() categoriaSelecionada = new EventEmitter<number>();

  constructor(private router: Router, 
              private categoriaService: CategoriaService,
              private utilService: UtilService
              ) { }

  selecionarCategoria(idCategoria: number) {
    this.categoriaSelecionada.emit(idCategoria);
  }

  carregaCategoriaPorTipo() {
    this.categorias = [];
    this.categoriaService.getByTipo(this.utilService.getRegistroTipo()).subscribe(
      (categoria: Categoria[]) => {
        this.categorias = categoria;
      },
      (e: any) => {
        console.error(e);
      }
    );
  }

  atualizaPagina(): void {
    const urlAtual = this.router.url;
    this.utilService.redirecionaPara(urlAtual);
  }

  ngOnInit(): void {
    this.carregaCategoriaPorTipo();
  }
}
