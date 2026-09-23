import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { ShoppingCartService } from '../../../core/services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styles: [
    `
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  shoppingCartService = inject(ShoppingCartService);

  handleAddProduct(product: Product, amount: number) {
    console.log(`Adding product: ${product.title} with amount: ${amount}`);
    this.shoppingCartService.addProduct(product, amount);
  }
}
