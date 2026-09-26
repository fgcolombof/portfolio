import { InvoiceStatus } from '../enums/invoice-status.enum';

export interface InvoiceItem {
  title: string;
  unitPrice: number;
  quantity: number;
}

export interface PaymentDetails {
  method: string;
  lastFourDigits: string;
  transactionId: string;
  authorizationCode: string;
}

export interface Invoice {
  id: string;
  customerEmail: string;
  taxId?: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  paymentDetails?: PaymentDetails;
  createdAt: Date;
  paidAt?: Date;
}
