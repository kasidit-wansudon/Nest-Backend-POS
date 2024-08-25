import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { OrderSchema } from './order.schema';
import { OrderController } from './order.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'orderC', schema: OrderSchema }]), // กำหนดโมเดลและสคีมา
  ],
  providers: [OrderService],
  controllers: [OrderController], // รวม Controller
  exports: [OrderService],
})
export class OrderModule {}
