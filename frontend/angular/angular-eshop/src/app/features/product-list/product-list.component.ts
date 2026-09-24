import { Component, inject, computed, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  
  products =  toSignal(from(this.productService.getProducts()), {initialValue: []});
  
 readonly isLoading = computed(() => {
  const list = this.products();
  // Retorna true si es null O si tiene largo 0
  return !list || list.length === 0;
});

async ngOnInit(): Promise<void> {
  await this.productService.refreshProducts();
}
}
