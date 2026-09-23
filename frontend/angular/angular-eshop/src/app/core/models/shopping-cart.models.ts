import { Product } from './product.model';

export interface IShoppingCartItem {
  product: Product;
  amount: number;
}

export class ShoppingCartItem implements IShoppingCartItem {
  product: Product;
  amount: number;

  constructor(product: Product, amount: number) {
    this.product = product;
    this.amount = amount;
  }
}

export class ShoppingCart {
  items: ShoppingCartItem[];
  total: number;

  constructor() {
    this.items = [];
    this.total = 0.0;
  }

  addItem(product: Product, amount: number): void {
    if (this.items.find(({ product: prod }) => prod.id == product.id)) {
      const found = this.removeItem(product.id);
      const total_item = found!.product.price * found!.amount;
      this.total -= total_item;
    }
    this.items = [...this.items, new ShoppingCartItem(product, amount)];
    const total_item = product.price * amount;
    this.total += total_item;
    console.log(`ShoppingCart Item added to cart: ${product.title} with amount: ${amount}`);
    console.log(`Items: ${this.items}`);
  }

  removeItem(productId: number): ShoppingCartItem | undefined {
    const removed: ShoppingCartItem | undefined = this.items.find(
      ({ product }) => product.id == productId,
    );
    if (removed) {
      this.items = this.items.filter(({ product }) => product.id == productId);
      const total_item = removed.product.price * removed.amount;
      this.total -= total_item;
    }
    return removed;
  }
}
