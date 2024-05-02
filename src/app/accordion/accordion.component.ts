import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
})
export class AccordionComponent {
  @Input() name: string = '';
  @Input() products: any[] = [];

  @Output() addToCartEventAccordion = new EventEmitter<number>();

  addToCart(id: number) {
    this.addToCartEventAccordion.emit(id);
  }

  IMG_URL = 'assets/productos/imgs/';
  isOpen: boolean = false;

  toggleAccordion() {
    this.isOpen = !this.isOpen;
  }
}
