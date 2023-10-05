import { DetalheComponent } from './view/detalhe/detalhe.component';
import { PainelControleComponent } from './view/painel-controle/painel-controle.component';
import { HomeComponent } from './view/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './view/error404/error404.component';
import { RegistroComponent } from './view/registro/registro.component';
import { AuthGuard } from './config/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: HomeComponent },
  { path: 'painel-de-controle', component: PainelControleComponent, canActivate: [AuthGuard] },
  { path: 'registros', component: RegistroComponent },
  { path: 'registros/artigos', component: RegistroComponent },
  { path: 'registros/certificados', component: RegistroComponent },
  { path: 'registros/diplomas', component: RegistroComponent },
  { path: 'registros/experiencias', component: RegistroComponent },
  { path: 'registros/projetos', component: RegistroComponent },
  { path: 'detalhes', component: DetalheComponent },
  { path: 'error404', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
