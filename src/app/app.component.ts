import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AccordionGroupComponent } from './accordion-group/accordion-group.component';
import { CartComponent } from './cart/cart.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { SmallCardComponent } from './small-card/small-card.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    AccordionGroupComponent,
    CartComponent,
    NavbarComponent,
    ProductModalComponent,
    CategoryModalComponent,
    SmallCardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  API_URL = 'https://65e8aeed4bb72f0a9c50203a.mockapi.io/'; //mockapi api url
  categories: any[] = [];
  products: any[] = [];
  productsOnCart: any[] = [];
  total: number = 0.0;

  //at start
  ngOnInit() {
    this.getData();
  }

  //API METHODS
  // Para simular el backend de la asignatura,
  // se ha utilizado la herramienta online
  // mockapi.io , que permite simular una API,
  // de forma que no sea necesario recorrer un
  // JSON cada vez que se quiera consultar/modificar datos
  getCategories() {
    return fetch(this.API_URL + 'categorias', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((categorias) => {
        return categorias;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error;
      });
  }

  getProducts() {
    return fetch(this.API_URL + 'productos', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((productos) => {
        return productos;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error;
      });
  }

  getData() {
    let promiseCategories = this.getCategories();
    let promiseProducts = this.getProducts();

    Promise.all([promiseCategories, promiseProducts]).then((resultados) => {
      let cats = resultados[0];
      let prods = resultados[1];

      console.log(cats);
      console.log(prods);

      this.categories = cats;
      this.products = prods;
    });
  }

  addToCart(id: number): void {
    console.log(id);
    const product = this.products.find((prod) => prod.id === id);
    if (!product) {
      return;
    }
    if (product.stock === 0) {
      alert('No hay stock disponible');
      return;
    }

    const existingProductIndex = this.productsOnCart.findIndex(
      (prod) => prod.id === id
    );

    console.log(existingProductIndex);

    if (existingProductIndex !== -1) {
      const updatedProduct = { ...this.productsOnCart[existingProductIndex] };
      updatedProduct.stock++;
      updatedProduct.prize += product.precio;
      this.productsOnCart[existingProductIndex] = updatedProduct;
      console.log(this.productsOnCart);
    } else {
      this.productsOnCart.push({
        id: product.id,
        imagePath: product.imagen,
        title: `${product.nombre} - ${product.artista}`,
        prize: product.precio,
        stock: 1,
      });
      console.log(this.productsOnCart);
    }

    this.total += product.precio;
    product.stock--;
  }

  deleteFromCart(id: number): void {
    const existingProductIndex = this.productsOnCart.findIndex(
      (prod) => prod.id === id
    );
    if (existingProductIndex !== -1) {
      const updatedProduct = { ...this.productsOnCart[existingProductIndex] };
      const prize = updatedProduct.prize / updatedProduct.stock;
      updatedProduct.prize -= prize;
      updatedProduct.stock--;

      if (updatedProduct.stock === 0) {
        this.productsOnCart.splice(existingProductIndex, 1);
      } else {
        this.productsOnCart[existingProductIndex] = updatedProduct;
      }

      const productToUpdate = this.products.find((prod) => prod.id === id);
      if (productToUpdate) {
        productToUpdate.stock++;
      }

      this.total -= prize;
    }
  }

  addCategory(name: string): void {
    const nameExists = this.categories.some(
      (category) => category.nombre === name
    );
    if (nameExists) {
      alert('El nombre de la categoría ya existe.');
      return;
    }
    const newCategory = {
      id: this.categories.length,
      nombre: name,
    };
    this.categories.push(newCategory);
  }

  addProduct(
    category: string,
    name: string,
    artist: string,
    prize: number,
    stock: number,
    imageUrl: string
  ): void {
    const newProduct = {
      id: this.products.length + 1,
      categoria: category,
      nombre: name,
      artista: artist,
      precio: parseFloat(prize.toFixed(2)),
      stock: stock,
      imagen: imageUrl,
    };
    this.products.push(newProduct);
  }

  handleOrder() {
    this.total = 0.0;
    this.productsOnCart = [];
  }
}
