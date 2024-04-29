import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-small-card',
  standalone: true,
  imports: [],
  templateUrl: './small-card.component.html',
  styleUrl: './small-card.component.css',
})
export class SmallCardComponent {
  @Input() imagePath: string = '';
  @Input() title: string = '';
  @Input() prize: number = 0.0;
  @Input() stock: number = 0;
  @Input() id: number = 0;

  IMG_URL = 'assets/productos/imgs/';

  @Output() deleteFromCartSmallCardEvent = new EventEmitter<number>();

  deleteFromCart(id: number) {
    this.deleteFromCartSmallCardEvent.emit(id);
  }
}
