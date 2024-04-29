import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css'],
})
export class CategoryModalComponent {
  modalOpen: boolean = false;
  categoryName: string = '';

  @Output() addCategoryEvent = new EventEmitter<string>();

  addCategory() {
    this.addCategoryEvent.emit(this.categoryName);
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.addCategory();
    this.categoryName = '';
    this.closeModal();
  }
}
