import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { CommonModule } from '@angular/common';
import { SmallCardComponent } from '../small-card/small-card.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [OrderModalComponent, CommonModule, SmallCardComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  @Input() total: number = 0.0;
  @Input() content: any[] = [];

  @Output() deleteFromCartEvent = new EventEmitter<number>();
  @Output() handleOrderEvent = new EventEmitter<void>();

  deleteFromCart(id: number) {
    this.deleteFromCartEvent.emit(id);
  }

  handleOrder() {
    console.log('CART');
    this.handleOrderEvent.emit();
  }
}
