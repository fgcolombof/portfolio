import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product-list/product-list.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { ShoppingCartComponent } from './features/shopping.cart/shopping.cart.component';
import { InProcessComponent } from './features/in-process/in-process.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    title: 'E-Shop - Products',
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    title: 'E-Shop - Product Detail',
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    title: 'E-Shop - Shopping Cart',
  },
  {
    path: 'in-process',
    component: InProcessComponent,
    title: 'E-Shop - Work in Progress',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
