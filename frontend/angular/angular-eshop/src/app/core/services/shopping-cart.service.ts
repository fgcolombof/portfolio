import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { ShoppingCart, ShoppingCartItem } from '../models/shopping-cart.models';

const CART_STORAGE_KEY = 'eshop_cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private shoppingCart: ShoppingCart = new ShoppingCart();

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        const cartData = JSON.parse(storedCart);
        this.shoppingCart = this.deserializeCart(cartData);
      } catch (e) {
        console.error('Error loading cart from localStorage:', e);
        this.shoppingCart = new ShoppingCart();
      }
    }
  }

  private saveCartToStorage(): void {
    try {
      const cartData = this.serializeCart(this.shoppingCart);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }

  private serializeCart(cart: ShoppingCart): any {
    return {
      items: cart.items.map(item => ({
        product: item.product,
        amount: item.amount
      })),
      total: cart.total
    };
  }

  private deserializeCart(data: any): ShoppingCart {
    const cart = new ShoppingCart();
    cart.items = data.items.map((item: any) => 
      new ShoppingCartItem(item.product, item.amount)
    );
    cart.total = data.total;
    return cart;
  }

  getShoppingCart() {
    return this.shoppingCart;
  }

  addProduct(product: Product, amount: number) {
    let item: ShoppingCartItem = new ShoppingCartItem(product, amount);
    console.log(`Srvc Adding product to cart: ${product.title} with amount: ${amount}`);
    this.shoppingCart.addItem(product, amount);
    this.saveCartToStorage();
  }

  removeProduct(productId: number): ShoppingCartItem | undefined {
    const removed = this.shoppingCart.removeItem(productId);
    this.saveCartToStorage();
    return removed;
  }

  clearCart(): void {
    this.shoppingCart = new ShoppingCart();
    this.saveCartToStorage();
  }
}
