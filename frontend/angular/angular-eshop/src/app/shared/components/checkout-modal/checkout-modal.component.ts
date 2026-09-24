import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ShoppingCartService } from '../../../core/services/shopping-cart.service';
import { ShoppingCartItem } from '../../../core/models/shopping-cart.models';

@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout-modal.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CheckoutModalComponent {
  private router = inject(Router);
  private cartService = inject(ShoppingCartService);

  isOpen = signal<boolean>(false);
  orderNumber = signal<string>('');
  orderDate = signal<string>('');
  cartItems = signal<ShoppingCartItem[]>([]);
  totalAmount = signal<number>(0);

  openCheckout(items: ShoppingCartItem[], total: number): void {
    if (items.length === 0) return;

    this.orderNumber.set(`#ORD-2026-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`);
    this.orderDate.set(new Date().toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }));
    this.cartItems.set([...items]);
    this.totalAmount.set(total);
    this.isOpen.set(true);
  }

  closeCheckout(): void {
    this.isOpen.set(false);
  }

  continueShopping(): void {
    this.cartService.clearCart();
    this.closeCheckout();
    this.router.navigate(['/']);
  }
}
