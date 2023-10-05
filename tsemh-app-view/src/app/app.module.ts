import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavComponent } from './view/barra-nav/barra-nav.component';
import { CategoriaComponent } from './view/categoria/categoria.component';
import { DetalheComponent } from './view/detalhe/detalhe.component';
import { EntradaComponent } from './view/entrada/entrada.component';
import { HomeComponent } from './view/home/home.component';
import { PainelControleComponent } from './view/painel-controle/painel-controle.component';
import { RodapeComponent } from './view/rodape/rodape.component';
import { Error404Component } from './view/error404/error404.component';
import { RegistroComponent } from './view/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraNavComponent,
    CategoriaComponent,
    DetalheComponent,
    EntradaComponent,
    HomeComponent,
    PainelControleComponent,
    RodapeComponent,
    Error404Component,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
