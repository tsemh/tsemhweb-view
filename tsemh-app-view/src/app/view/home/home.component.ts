import { UtilService } from './../../service/util.service';
import { UsuarioService } from './../../service/usuario.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria';
import { Registro } from 'src/app/models/Registro';
import { Usuario } from 'src/app/models/usuario';
import { RegistroService } from 'src/app/service/registro.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tituloMain: string = 'destaques';
  public destaque: boolean = true;
  public usuario!: Usuario;
  public paragrafos: string[] = [];
  @Input() registro: Registro[] = [];
  @Input() categorias: Categoria[] = [];
  @Output() registroSelecionado = new EventEmitter<number>();

  constructor(private usuarioService: UsuarioService,
              private registroService: RegistroService,
              private utilService: UtilService) { }

  carregaUsuario(): void {
    this.usuarioService.getAll().subscribe(
      (tiago: Usuario[]) => {
        this.usuario = tiago[0];
        this.separaParagrafos();
      },
      (e: any) => {
        console.error(e);
      }
    );
  } 

  carregaRegistro(): void {
    this.registroService.getByDestaque(this.destaque).subscribe(
      (projeto: Registro[]) => {
        this.registro = projeto;
      },
      (e: any) => {
        console.error(e);
      }
    );
  }
  
  selecionarRegistro(idRegistro: number): void {
    this.utilService.setRegistroId(idRegistro)
  }
  
  separaParagrafos(): void {
    this.paragrafos = this.utilService.separaParagrafos(this.usuario.descricao);
  }
  
  redirecionaPara(url: string): void {
    this.utilService.redirecionaPara(url);
  }

  ngOnInit(): void {
    this.carregaUsuario();
    this.carregaRegistro();
  }

}
