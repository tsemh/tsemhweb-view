import { Usuario } from 'src/app/models/usuario';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from 'src/app/service/registro.service';
import { Registro } from 'src/app/models/Registro';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'tsemh-painel-controle',
  templateUrl: './painel-controle.component.html',
  styleUrls: ['./painel-controle.component.css']
})
export class PainelControleComponent implements OnInit {

  public modalRef?: BsModalRef;
  public visaoPaginacao: boolean = true;
  public tiposDeRegistro: string[] = [];
  public preTiposDeRegistro: string[] = [];
  public categorias: Categoria[] = [];
  public formUsuario!: FormGroup;
  public formRegistro!: FormGroup;
  public usuario!: Usuario;
  public registros: Registro[] = [];
  public registro!: Registro;
  public page: number = 1;
  public tipo!: string;
  public idRegistroSelecionado!: number;
  public editaRegistro: boolean = true;


  constructor(private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private registroService: RegistroService,
    private modalService: BsModalService,
    private categoriaService: CategoriaService) {
    this.criarFormUsuario();
    this.criarFormRegistro();
  }

  ngOnInit(): void {
    this.carregaUsuario();
    this.carregaPreTiposDeRegistro() 
    this.carregaTiposDeRegistro();
    this.carregaRegistro();
  }

  carregaPreTiposDeRegistro() {
    this.preTiposDeRegistro = ["artigo", "certificado", "diploma", "experiencia", "projeto"]
  }

  criarFormUsuario() {
    this.formUsuario = this.fb.group({
      nome: ['', Validators.required],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      curriculumVitae: ['', Validators.required]
    });
  }

  criarFormRegistro() {
    this.formRegistro = this.fb.group({
      id: ['', Validators.required],
      categoria: ['', Validators.required],
      tipo: ['', Validators.required],
      nome: ['', Validators.required],
      link: ['', Validators.required],
      descricao: ['', Validators.required],
      dataCriacao: ['', Validators.required],
      destaque: ['', Validators.required]
    });
  }

  carregaUsuario(): void {
    this.usuarioService.getAll().subscribe(
      (tiago: Usuario[]) => {
        this.usuario = tiago[0];
        this.formUsuario.patchValue(this.usuario);
      },
      (e: any) => {
        console.error(e);
      }
    );
  }

  carregaRegistro() {
    this.registroService.getAll().subscribe(
      (registro: Registro[]) => {
        this.registros = registro;
      },
      (e: any) => {
        console.error(e);
        // Adicione tratamento de erro adequado aqui
      }
    );
  }
  carregaRegistroPorTipo(): void {
    this.registroService.getByTipo(this.tipo).subscribe(
      (registro: Registro[]) => {
        this.registros = registro;
        this.page = 1;
      },
      (e: any) => {
        console.error(e);
      }
    );
  }
  carregaCategoriaPorTipo(): void {
    this.categorias = [];
    this.categoriaService.getByTipo(this.registro.tipo).subscribe(
      (categoria: Categoria[]) => {
        this.categorias = categoria;
      },
      (e: any) => {
        console.error(e);
      }
    );
  }
  carregaTodasCategorias(): void {
    this.categorias = [];
    this.categoriaService.getAll().subscribe(
      (categoria: Categoria[]) => {
        this.categorias = categoria;
      },
      (e: any) => {
        console.error(e);
      }
    );
  }

  carregaRegistroPorId(): void {
    this.registroService.getById(this.idRegistroSelecionado).subscribe(
      (registro: Registro) => {
        this.registro = registro;

        const tipoIndex = this.tiposDeRegistro.findIndex(tipo => tipo === registro.tipo);

        if (tipoIndex !== -1) {
          this.formRegistro.get('tipo')?.setValue(this.tiposDeRegistro[tipoIndex]);
        }

        this.formRegistro.get('destaque')?.setValue(registro.destaque);
        
        this.carregaCategoriaPorTipo();

        this.formRegistro.patchValue(this.registro);
      },
      (e: any) => {
        console.error(e);
      }
    );
  }

  carregaTiposDeRegistro(): void {
    this.registroService.getTiposDeRegistro().subscribe(
      tipos => {
        this.tiposDeRegistro = tipos;
      },
      error => {
        console.error(error);
      }
    );
  }

  enviarUsuario() {
    const { nome, titulo, descricao, curriculumVitae } = this.formUsuario.value;

    this.usuarioService.putUsuario(nome, titulo, descricao, curriculumVitae, this.usuario.id).subscribe(
      (usuario: Usuario) => {
        alert("Usuário atualizado");
      },
      (error: any) => {
        console.error('Erro ao atualizar o usuário:', error);
      }
    );
    window.location.reload();
  }

  enviarRegistro() {
    const { id, tipo, nome, link, descricao, introducao, dataCriacao, destaque, categoria } = this.formRegistro.value;
    const dadosRegistro = {
      id: id,
      tipo: tipo,
      nome: nome,
      link: link,
      descricao: descricao,
      introducao: introducao,
      dataCriacao: dataCriacao,
      destaque: destaque,
      categoria: categoria
    };

    this.registroService.putRegistro(dadosRegistro, this.registro.id).subscribe(
      (registro: Registro) => {
        alert("Registro atualizado")
      },
      (error: any) => {
        console.error('Erro ao atualizar o registro:', error);
      }
    );
    window.location.reload();
  }

  criarRegistro() {
    const { id, tipo, nome, link, descricao, introducao, dataCriacao, categoria, destaque } = this.formRegistro.value;
    const tituloCategoria = categoria.titulo;
    const dadosRegistro = {
      id: id,
      tipo: tipo,
      nome: nome,
      link: link,
      descricao: descricao,
      introducao: introducao,
      dataCriacao: dataCriacao,
      tituloCategoria: tituloCategoria,
      destaque: destaque
    };


    this.registroService.postRegistro(dadosRegistro, this.usuario.id, categoria).subscribe(
      (registro: Registro) => {
        alert("Registro criado")
      },
      (error: any) => {
        console.error('Erro na criação do registro', error);
      }
    );
    window.location.reload();
  }

  deletaRegistro(id: number) {
    this.registroService.deleteRegistro(id).subscribe(
      () => {
        alert("Registro deletado");
        window.location.reload();
      },
      (error: any) => {
        console.error("Erro ao deletar o registro:", error);
      }
    );
    window.location.reload();
  }

  pegaIdRegistro(idRegistro: number): void {
    this.idRegistroSelecionado = idRegistro;
  }

  pegaTipo(tipo: string): void {
    this.tipo = tipo;
    this.carregaRegistroPorTipo();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  abreCriaRegistro(template: TemplateRef<any>) {
    this.registro = new Registro();
    this.formRegistro.patchValue(this.registro);
    this.carregaTodasCategorias();
    this.openModal(template);
    this.editaRegistro = false;
  }


  cliqueRegistro(template: TemplateRef<any>, idRegistro: number) {
    this.openModal(template);
    this.pegaIdRegistro(idRegistro);
    this.editaRegistro = true;
    this.carregaRegistroPorId();
  }

  CliqueTipo(tipo: string): void {
    this.pegaTipo(tipo);
    this.defineCorTipo();
  }
  defineCorTipo(): void {
    const botoes = document.querySelectorAll('.botao-tipo');
    botoes.forEach(botao => {
      botao.addEventListener('click', function () {
        botoes.forEach(botao => botao.classList.remove('tipoCor'));

        botao.classList.add('tipoCor');
      });
    });
  }
}
