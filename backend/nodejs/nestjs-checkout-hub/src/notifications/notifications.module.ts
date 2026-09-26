import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsController } from './notifications.controller';
import { NotificationEntity } from './entities/notification.entity';
import { UserEntity } from '../users/entities/user.entity';
import { InvoiceEntity } from '../invoices/entities/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity, UserEntity, InvoiceEntity])],
  controllers: [NotificationsController],
  providers: [NotificationsGateway],
  exports: [NotificationsGateway, TypeOrmModule],
})
export class NotificationsModule {}
