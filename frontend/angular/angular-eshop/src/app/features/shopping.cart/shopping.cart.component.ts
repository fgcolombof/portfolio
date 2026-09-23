import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ShoppingCartService } from '../../core/services/shopping-cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-shopping.cart',
  imports: [CurrencyPipe],
  templateUrl: './shopping.cart.component.html',
  styleUrl: './shopping.cart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent {
  shoppingCartService = inject(ShoppingCartService);
  shoppingCart = this.shoppingCartService.getShoppingCart();
}
