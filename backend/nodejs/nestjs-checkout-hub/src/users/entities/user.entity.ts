import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InvoiceEntity } from '../../invoices/entities/invoice.entity';
import { NotificationEntity } from '../../notifications/entities/notification.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  taxId?: string;

  @OneToMany(() => InvoiceEntity, invoice => invoice.user)
  invoices: InvoiceEntity[];

  @OneToMany(() => NotificationEntity, notification => notification.user)
  notifications: NotificationEntity[];
}
