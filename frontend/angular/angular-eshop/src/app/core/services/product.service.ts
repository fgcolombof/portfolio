import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly apiUrl = 'https://fakestoreapi.com/products';

  // Usamos un Map simple para el caché
  private productCache = new Map<number, Product>();

  constructor(private http: HttpClient) {}

  // 1. Conseguir todos (con Async/Await)
  async getProducts(): Promise<Product[]> {
    if (this.productCache.size > 0) {
      return Array.from(this.productCache.values());
    }
    const products = await firstValueFrom(this.http.get<Product[]>(this.apiUrl));
    console.log(JSON.stringify(products));
    products.forEach((p) => this.productCache.set(p.id, p));
    return products;
  }

  // 2. Conseguir uno solo (Aquí estaba el lío)
  async getProductById(id: number): Promise<Product | null> {
    if (this.productCache.has(id)) {
      return this.productCache.get(id)!;
    }
    const product = await firstValueFrom(this.http.get<Product>(`${this.apiUrl}/${id}`));
    this.productCache.set(product.id, product);
    return product;
  }

  // 3. Resetear caché y recargar productos completos
  async refreshProducts(): Promise<Product[]> {
    this.productCache.clear();
    return this.getProducts();
  }
}
