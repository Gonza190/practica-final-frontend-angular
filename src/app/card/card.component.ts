import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() imagePath: any = '';
  @Input() title: string = '';
  @Input() prize: number = 0.0;
  @Input() stock: number = 0;
  @Input() id: number = 0;

  @Output() addToCartEventCard = new EventEmitter<number>();

  addToCart(id: number) {
    this.addToCartEventCard.emit(id);
  }
}
