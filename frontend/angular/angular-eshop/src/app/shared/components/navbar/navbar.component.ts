import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShoppingCartService } from '../../../core/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NavbarComponent {
  shoppingCartService = inject(ShoppingCartService);

  get totalItems(): number {
    return this.shoppingCartService.getShoppingCart().items.reduce((sum: number, item: any) => sum + item.amount, 0);
  }
}
