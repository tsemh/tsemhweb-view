import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tsemh-footer',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.css']
})
export class RodapeComponent implements OnInit{

  public anoAtual: number = new Date().getFullYear();

  constructor() {  }

  ngOnInit() { 


   }


}
