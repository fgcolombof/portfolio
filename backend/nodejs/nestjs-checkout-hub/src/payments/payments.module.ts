import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { InvoiceEntity } from '../invoices/entities/invoice.entity';
import { PaymentReceiptEntity } from './entities/payment-receipt.entity';
import { NotificationEntity } from '../notifications/entities/notification.entity';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity, PaymentReceiptEntity, NotificationEntity]), NotificationsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
