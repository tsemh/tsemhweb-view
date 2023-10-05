import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';  

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private baseUrl = `${environment.apiUrl}/login`;

  constructor(private httpClient: HttpClient) {}

  login(dadosLogin: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    return this.httpClient.post(this.baseUrl, dadosLogin, { headers }).subscribe(
      (data: any) => {  
        const token = data.token;
        localStorage.setItem('token', token);
        window.location.href = '/painel-de-controle';
      },
      error => {
        console.error('Erro ao fazer login', error);
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/home';
  }
  
}
