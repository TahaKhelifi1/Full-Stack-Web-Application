import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product';
import { Product } from '../models/product';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminComponent implements OnInit {
  private service = inject(ProductService);

  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal('');
  success = signal('');

  isEditing = signal(false);
  editId = signal<number | null>(null);

  form = {
    title: '',
    description: '',
    price: 19.99,
    thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.webp',
    category: 'electronics',
    stock: 10,
  };

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    this.error.set('');
    this.service.getProducts(50, 0).subscribe({
      next: (res) => {
        this.products.set(res.products);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load products from API');
        this.loading.set(false);
      },
    });
  }

  getCategoryName(cat: any): string {
    if (!cat) return '';
    return typeof cat === 'object' && cat.name ? cat.name : String(cat);
  }

  startEdit(p: Product) {
    this.isEditing.set(true);
    this.editId.set(p.id);
    this.form = {
      title: p.title,
      description: p.description,
      price: p.price,
      thumbnail: p.thumbnail,
      category: this.getCategoryName(p.category),
      stock: p.stock ?? 10,
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  resetForm() {
    this.isEditing.set(false);
    this.editId.set(null);
    this.form = {
      title: '',
      description: '',
      price: 19.99,
      thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.webp',
      category: 'electronics',
      stock: 10,
    };
  }

  saveProduct() {
    this.error.set('');
    this.success.set('');

    if (this.isEditing() && this.editId() !== null) {
      this.service.updateProduct(this.editId()!, this.form).subscribe({
        next: () => {
          this.success.set(`Product #${this.editId()} updated successfully!`);
          this.resetForm();
          this.loadProducts();
        },
        error: (err) => {
          this.error.set(err?.error?.error || 'Failed to update product');
        },
      });
    } else {
      this.service.createProduct(this.form).subscribe({
        next: () => {
          this.success.set('Product created successfully in database!');
          this.resetForm();
          this.loadProducts();
        },
        error: (err) => {
          this.error.set(err?.error?.error || 'Failed to create product');
        },
      });
    }
  }

  deleteProduct(id: number) {
    if (!confirm(`Are you sure you want to delete product #${id}?`)) return;
    this.error.set('');
    this.success.set('');
    this.service.deleteProduct(id).subscribe({
      next: () => {
        this.success.set(`Product #${id} deleted.`);
        this.loadProducts();
      },
      error: () => {
        this.error.set('Failed to delete product');
      },
    });
  }
}
