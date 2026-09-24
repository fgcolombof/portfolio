import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../core/services/shopping-cart.service';
import { CurrencyPipe } from '@angular/common';
import { CheckoutModalComponent } from '../../shared/components/checkout-modal/checkout-modal.component';

@Component({
  selector: 'app-shopping.cart',
  imports: [CurrencyPipe, CheckoutModalComponent],
  templateUrl: './shopping.cart.component.html',
  styleUrl: './shopping.cart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent {
  private router = inject(Router);
  shoppingCartService = inject(ShoppingCartService);
  shoppingCart = this.shoppingCartService.getShoppingCart();

  @ViewChild(CheckoutModalComponent) checkoutModal!: CheckoutModalComponent;

  removeItem(productId: number): void {
    this.shoppingCartService.removeProduct(productId);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  handleCheckout(): void {
    if (this.shoppingCart.items.length === 0) return;
    this.checkoutModal.openCheckout(this.shoppingCart.items, this.shoppingCart.total);
  }
}
