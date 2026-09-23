// src/app/components/quantity-stepper/quantity-stepper.component.ts
import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-quantity-stepper',
  standalone: true,
  templateUrl: './quantity-stepper.html',
})
export class QuantityStepperComponent {
  // Entradas desde el padre (Signal-based Inputs)
  quantity = input<number>(1);
  min = input<number>(1);
  max = input<number>(99);

  // Evento hacia el padre (Native Output)
  quantityChange = output<number>();

  increment(): void {
    if (this.quantity() < this.max()) {
      this.quantityChange.emit(this.quantity() + 1);
    }
  }

  decrement(): void {
    if (this.quantity() > this.min()) {
      this.quantityChange.emit(this.quantity() - 1);
    }
  }
}