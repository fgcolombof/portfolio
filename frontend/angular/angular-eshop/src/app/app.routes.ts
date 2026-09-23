import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product-list/product-list.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { ShoppingCartComponent } from './features/shopping.cart/shopping.cart.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    title: 'E-Shop - Productos',
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    title: 'E-Shop - Detalle del Producto',
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    title: 'E-Shop - Shopping Cart',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
