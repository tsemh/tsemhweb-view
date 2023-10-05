import { EntradaComponent } from './view/entrada/entrada.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'tsemh';

  public modalRef?: BsModalRef;
 
  constructor(private modalService: BsModalService) {}

  openModal() {
    this.modalRef = this.modalService.show(EntradaComponent);
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.altKey && event.key === 'l') {
      this.openModal();
    }
  }
}
