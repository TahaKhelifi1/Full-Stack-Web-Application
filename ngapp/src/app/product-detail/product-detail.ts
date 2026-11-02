import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../product';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private service = inject(ProductService);

  product = signal<Product | null>(null);
  loading = signal(true);
  error = signal('');

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.loading.set(true);
      this.error.set('');
      this.service.getProduct(id).subscribe({
        next: (data) => {
          this.product.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Unable to load the product');
          this.loading.set(false);
        },
      });
    });
  }

  getCategoryName(cat: any): string {
    if (!cat) return '';
    return typeof cat === 'object' && cat.name ? cat.name : String(cat);
  }
}