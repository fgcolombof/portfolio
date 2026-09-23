import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { ShoppingCartService } from '../../core/services/shopping-cart.service';
import { Product } from '../../core/models/product.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { QuantityStepperComponent } from '../../shared/components/quantity-stepper/quantity-stepper';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [QuantityStepperComponent],
  templateUrl: './product-detail.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private productService = inject(ProductService);
  private cartService = inject(ShoppingCartService);

  selectedQuantity = signal<number>(1);

  onQuantityChange(newQty: number): void {
    this.selectedQuantity.set(newQty);
  }

  handleAddToCart(): void {
    const currentProduct = this.product();
    if (currentProduct) {
      // Inyecta directamente la cantidad seleccionada al carrito
      this.cartService.addProduct(currentProduct, this.selectedQuantity());
    }
  }

  private productId$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id')))
  );

  product = toSignal<Product | null>(
    this.productId$.pipe(
      switchMap(id => this.productService.getProductById(id))
    ),
    { initialValue: null }
  );

  goBack() {
    this.location.back();
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}