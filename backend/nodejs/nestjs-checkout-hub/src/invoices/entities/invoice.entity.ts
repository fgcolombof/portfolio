import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, CreateDateColumn } from 'typeorm';
import { InvoiceStatus } from '../enums/invoice-status.enum';
import { UserEntity } from '../../users/entities/user.entity';
import { InvoiceItemEntity } from './invoice-item.entity';
import { PaymentReceiptEntity } from '../../payments/entities/payment-receipt.entity';

@Entity('invoices')
export class InvoiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, user => user.invoices, { onDelete: 'CASCADE' })
  user: UserEntity;

  @OneToMany(() => InvoiceItemEntity, item => item.invoice, { cascade: true })
  items: InvoiceItemEntity[];

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2 })
  tax: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'varchar', default: InvoiceStatus.PENDING })
  status: InvoiceStatus;

  @OneToOne(() => PaymentReceiptEntity, receipt => receipt.invoice, { nullable: true, cascade: true })
  paymentReceipt?: PaymentReceiptEntity;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  paidAt?: Date;
}
