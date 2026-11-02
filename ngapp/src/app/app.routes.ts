import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Contact } from './contact/contact';
import { About } from './about/about';
import { NotFound } from './not-found/not-found';
import { Products } from './products/products';
import { ProductDetail } from './product-detail/product-detail';
import { AdminComponent } from './admin/admin';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'contact', component: Contact },
  { path: 'contact/:id', component: Contact },
  { path: 'about', component: About },
  { path: 'products', component: Products },
  { path: 'products/:id', component: ProductDetail },
  { path: 'admin', component: AdminComponent },
  { path: '**', component: NotFound },
];