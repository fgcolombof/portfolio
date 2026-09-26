import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoiceEntity } from './entities/invoice.entity';
import { InvoiceItemEntity } from './entities/invoice-item.entity';
import { InvoiceStatus } from './enums/invoice-status.enum';
import { UsersService } from '../users/users.service';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepository: Repository<InvoiceEntity>,
    @InjectRepository(InvoiceItemEntity)
    private readonly invoiceItemRepository: Repository<InvoiceItemEntity>,
    private readonly usersService: UsersService,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<InvoiceEntity> {
    const user = await this.usersService.findOrCreate(
      createInvoiceDto.customerEmail,
      undefined,
      createInvoiceDto.taxId,
    );

    const items = createInvoiceDto.items.map(itemDto => {
      const totalPrice = itemDto.unitPrice * itemDto.quantity;
      const item = this.invoiceItemRepository.create({
        title: itemDto.title,
        unitPrice: itemDto.unitPrice,
        quantity: itemDto.quantity,
        totalPrice,
      });
      return item;
    });

    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = subtotal * 0.21;
    const total = subtotal + tax;

    const invoice = this.invoiceRepository.create({
      user,
      items,
      subtotal,
      tax,
      total,
      status: InvoiceStatus.PENDING,
    });

    return await this.invoiceRepository.save(invoice);
  }

  async findOne(id: string): Promise<InvoiceEntity> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: {
        user: true,
        items: true,
        paymentReceipt: true,
      },
    });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }

  async update(id: string, partialInvoice: Partial<InvoiceEntity>): Promise<InvoiceEntity> {
    const invoice = await this.findOne(id);
    const updatedInvoice = this.invoiceRepository.merge(invoice, partialInvoice);
    return await this.invoiceRepository.save(updatedInvoice);
  }
}
