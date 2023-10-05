import { UtilService } from 'src/app/service/util.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = `${environment.apiUrl}/usuario`;

  constructor(private http: HttpClient,
              private utilService: UtilService) { }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}`);
  }
  putUsuario(nome: string, titulo: string, descricao: string,curriculumVitae: string, id: number): Observable<Usuario> {
    const usuarioAtualizado: Partial<Usuario> = {
      nome: nome,
      titulo: titulo,
      descricao: descricao
    };
    const headers = this.utilService.createAuthorizationHeader();
    console.log(usuarioAtualizado + "Service");
    return this.http.put<Usuario>(`${this.baseUrl}/editar-visivel/${id}`, usuarioAtualizado, {headers});
  }
  
}
