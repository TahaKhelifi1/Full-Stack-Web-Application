import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../product';
import { Product } from '../models/product';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  private service = inject(ProductService);

  readonly limit = 12;
  products = signal<Product[]>([]);
  total = signal(0);
  skip = signal(0);
  loading = signal(true);
  error = signal('');
  query = signal('');
  constructor() {
    this.load();
  }

  load() {
  this.loading.set(true);
  this.error.set('');
  const request = this.query()
    ? this.service.searchProducts(this.query(), this.limit, this.skip())
    : this.service.getProducts(this.limit, this.skip());
  request.subscribe({
    next: (res) => {
      this.products.set(res.products);
      this.total.set(res.total);
      this.loading.set(false);
    },
    error: (err) => {
      console.error('Failed to load products:', err);
      this.error.set('Unable to load the products');
      this.loading.set(false);
    },
  });
}

  next() {
    this.skip.update((s) => s + this.limit);
    this.load();
  }

  previous() {
    this.skip.update((s) => Math.max(0, s - this.limit));
    this.load();
  }
  search(q: string) {
  this.query.set(q.trim());
  this.skip.set(0);
  this.load();
}
}