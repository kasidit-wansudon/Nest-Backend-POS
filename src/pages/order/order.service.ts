import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/services/base.service';
import { Order } from './order.schema';
@Injectable()
export class OrderService extends BaseService<Order> {

  constructor(@InjectModel('order') private readonly orderModel: Model<Order>) {
    super(orderModel);
  }

}
