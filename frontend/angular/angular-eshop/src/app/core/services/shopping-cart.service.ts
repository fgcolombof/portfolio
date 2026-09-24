import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { ShoppingCart, ShoppingCartItem } from '../models/shopping-cart.models';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private shoppingCart: ShoppingCart = new ShoppingCart();

  getShoppingCart() {
    return this.shoppingCart;
  }

  addProduct(product: Product, amount: number) {
    let item: ShoppingCartItem = new ShoppingCartItem(product, amount);
    console.log(`Srvc Adding product to cart: ${product.title} with amount: ${amount}`);
    this.shoppingCart.addItem(product, amount);
  }

  removeProduct(productId: number): ShoppingCartItem | undefined {
    return this.shoppingCart.removeItem(productId);
  }

  clearCart(): void {
    this.shoppingCart = new ShoppingCart();
  }
}
