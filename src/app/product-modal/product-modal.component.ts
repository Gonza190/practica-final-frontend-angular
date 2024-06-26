import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
})
export class ProductModalComponent {
  @Input() categories: any[] = [];

  modalOpen: boolean = false;
  productName: string = '';
  artist: string = '';
  selectedCategory: string = 'Hip-Hop';
  price: number = 0;
  stock: number = 0;
  imageUrl: string = '';

  @Output() addProductEvent = new EventEmitter<any>();

  addCategory(formData: any) {
    this.addProductEvent.emit(formData);
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  handleSubmit(event: any) {
    event.preventDefault();
    const formData = {
      productName: this.productName,
      artist: this.artist,
      selectedCategory: this.selectedCategory,
      price: this.price,
      stock: this.stock,
      imageUrl: this.imageUrl,
    };

    this.productName = '';
    this.artist = '';
    this.selectedCategory = 'Hip-Hop';
    this.price = 0;
    this.stock = 0;
    this.imageUrl = '';

    this.addCategory(formData);

    this.closeModal();
  }

  handleImageChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}
