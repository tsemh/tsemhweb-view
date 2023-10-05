import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from './registro.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {


  private registroId: number = 0;
  private categoriaId: number = 0;
  private tipo: string = "";

  constructor(
    private router: Router) { }
    

  createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  getRegistroId(): number{
    return this.registroId;
  }
  setRegistroId(idSelecionado: number): void {
    this.registroId = idSelecionado;
    this.armazenaIdSelecionado();
  }
  getCategoriaId(): number{
    return this.categoriaId;
  }
  setCategoriaId(idSelecionado: number): void {
    this.categoriaId = idSelecionado;
  }
  getRegistroTipo(): string {
    return this.tipo;
  }
  setRegistroTipo(tipo: string): void {
    this.tipo = tipo;
    this.armazenaTipoSelecionado()
  }

  private armazenaIdSelecionado(): void {
    localStorage.setItem('idArmazenado', this.registroId.toString());
  }
  private armazenaTipoSelecionado(): void {
    localStorage.setItem('tipoArmazenado', this.tipo)
  }
  
  erroNaoEncontrado(): void {
      this.router.navigateByUrl("error404");
  }

  separaParagrafos(descricao: string): string[] {
    return descricao.split('\n\n');
  }

  redirecionaPara(url: string): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url])
    );
  }
}
