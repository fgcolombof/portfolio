import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { InvoiceEntity } from './invoice.entity';

@Entity('invoice_items')
export class InvoiceItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => InvoiceEntity, invoice => invoice.items, { onDelete: 'CASCADE' })
  invoice: InvoiceEntity;

  @Column()
  title: string;

  @Column('decimal', { precision: 10, scale: 2 })
  unitPrice: number;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;
}
