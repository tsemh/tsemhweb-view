import { LoginService } from './../../service/login.service';
import { Component, HostListener, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'tsemh-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements AfterViewInit{
@ViewChild('email') emailElement!: ElementRef;
  
  public modalRef?: BsModalRef;
  public formEntrada!: FormGroup;
  public visualizaSenha!: boolean;
  public visualizaSenhaText: string;


  constructor(private modalService: BsModalService,
              private fb: FormBuilder,
              private loginService: LoginService) {
                this.criarForm();
                this.visualizaSenha = false;
                this.visualizaSenhaText = "Ver senha";
              }
  ngAfterViewInit(){
    this.adicionarFoco()    
  }

  criarForm() {
    const emailArmazenado = localStorage.getItem('emailArmazenado');
    this.formEntrada = this.fb.group({
      email: [emailArmazenado, Validators.required],
      senha:  ['', Validators.required]
    })
  }

  enviarEntrada() {
    const { email, senha } = this.formEntrada.value;
    const dados = {
      email: email,
      senha: senha
    };
    const dadosLogin = JSON.stringify(dados);
    this.loginService.login(dadosLogin);
    localStorage.setItem('emailArmazenado', email);
  }
  
  openModal() {
    this.modalRef = this.modalService.show(EntradaComponent);
  }
  
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.altKey && event.key === 'l') {
      this.openModal();
    }
  }

  adicionarFoco() {
    setTimeout(()=>{
      this.emailElement.nativeElement.focus();
    }, 0)
  }

  verSenha() {
    this.visualizaSenha = !this.visualizaSenha;
    if(this.visualizaSenha == false) {
      this.visualizaSenhaText = "Ver senha";
    } else {
      this.visualizaSenhaText = "Esconder senha";
    }
  }
}
