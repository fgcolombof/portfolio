import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { InvoiceEntity } from '../../invoices/entities/invoice.entity';

@Entity('payment_receipts')
export class PaymentReceiptEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => InvoiceEntity, invoice => invoice.paymentReceipt)
  @JoinColumn()
  invoice: InvoiceEntity;

  @Column()
  paymentMethod: string;

  @Column({ nullable: true })
  provider?: string;

  @Column({ nullable: true })
  lastFourDigits?: string;

  @Column()
  transactionCode: string;

  @Column()
  authorizationCode: string;

  @CreateDateColumn()
  processedAt: Date;
}
