import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.css',
})
export class OrderModalComponent {
  modalOpen: boolean = false;
  @Output() handleOrderModalEvent = new EventEmitter<void>();

  handleOrder() {
    this.handleOrderModalEvent.emit();
    this.closeModal();
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
}
