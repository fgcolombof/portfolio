import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessPaymentDto, PaymentMethod } from './dto/process-payment.dto';
import { InvoiceEntity } from '../invoices/entities/invoice.entity';
import { InvoiceStatus } from '../invoices/enums/invoice-status.enum';
import { PaymentReceiptEntity } from './entities/payment-receipt.entity';
import { NotificationEntity } from '../notifications/entities/notification.entity';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepository: Repository<InvoiceEntity>,
    @InjectRepository(PaymentReceiptEntity)
    private readonly paymentReceiptRepository: Repository<PaymentReceiptEntity>,
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async processPayment(processPaymentDto: ProcessPaymentDto): Promise<InvoiceEntity> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id: processPaymentDto.invoiceId },
      relations: {
        user: true,
        items: true,
        paymentReceipt: true,
      },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    if (invoice.status === InvoiceStatus.PAID) {
      throw new BadRequestException('Invoice is already paid');
    }

    const transactionCode = `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const authorizationCode = `auth-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

    let paymentMethodDisplay: string;
    let provider: string;
    let lastFourDigits: string;

    switch (processPaymentDto.paymentMethod) {
      case PaymentMethod.CREDIT_CARD:
        paymentMethodDisplay = 'CREDIT_CARD';
        provider = 'Visa';
        lastFourDigits = processPaymentDto.cardNumber.slice(-4);
        break;
      case PaymentMethod.DEBIT_CARD:
        paymentMethodDisplay = 'DEBIT_CARD';
        provider = 'Mastercard';
        lastFourDigits = processPaymentDto.cardNumber.slice(-4);
        break;
      case PaymentMethod.MERCADO_PAGO:
        paymentMethodDisplay = 'MERCADO_PAGO';
        provider = 'Mercado Pago';
        lastFourDigits = 'MP';
        break;
      default:
        paymentMethodDisplay = processPaymentDto.paymentMethod;
        provider = processPaymentDto.paymentMethod;
        lastFourDigits = processPaymentDto.cardNumber.slice(-4);
    }

    const paymentReceipt = this.paymentReceiptRepository.create({
      invoice,
      paymentMethod: paymentMethodDisplay,
      provider,
      lastFourDigits,
      transactionCode,
      authorizationCode,
    });

    await this.paymentReceiptRepository.save(paymentReceipt);

    const notification = this.notificationRepository.create({
      user: invoice.user,
      invoice,
      type: 'PAYMENT_SUCCESS',
      title: 'Payment Successful',
      message: `Payment of $${invoice.total} processed successfully for invoice ${invoice.id}`,
      isRead: false,
    });

    await this.notificationRepository.save(notification);

    const updatedInvoice = this.invoiceRepository.merge(invoice, {
      status: InvoiceStatus.PAID,
      paymentReceipt,
      paidAt: new Date(),
    });

    const savedInvoice = await this.invoiceRepository.save(updatedInvoice);

    this.notificationsGateway.emitNotification('PAYMENT_SUCCESS', {
      invoiceId: savedInvoice.id,
      transactionCode,
      authorizationCode,
      amount: savedInvoice.total,
      timestamp: savedInvoice.paidAt,
    });

    return savedInvoice;
  }
}
