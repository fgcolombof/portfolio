import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsCreditCard } from 'class-validator';

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  MERCADO_PAGO = 'MERCADO_PAGO',
}

export class ProcessPaymentDto {
  @ApiProperty({ example: 'inv-123' })
  @IsNotEmpty()
  @IsString()
  invoiceId: string;

  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.CREDIT_CARD })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({ example: '4242424242424242' })
  @IsCreditCard()
  cardNumber: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  cardHolder: string;
}
