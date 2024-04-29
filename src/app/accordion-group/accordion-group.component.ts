import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from '../accordion/accordion.component';

@Component({
  selector: 'app-accordion-group',
  standalone: true,
  imports: [CommonModule, AccordionComponent],
  templateUrl: './accordion-group.component.html',
  styleUrl: './accordion-group.component.css',
})
export class AccordionGroupComponent {
  @Input() categories: any[] = [];
  @Input() products: any[] = [];
  /*   @Input() addToCart: any; */

  @Output() addToCartEvent = new EventEmitter<number>();

  addToCart(id: number) {
    this.addToCartEvent.emit(id);
  }

  /*   ngOnInit() {
    this.filterProducts();
  } */

  filterProducts() {
    let list: { [categoryName: string]: any[] } = {};
    this.categories.forEach((category) => {
      list[category.nombre] = [];
    });
    this.products.forEach((product) => {
      list[product.categoria].push(product);
    });
    return list;
  }
}
