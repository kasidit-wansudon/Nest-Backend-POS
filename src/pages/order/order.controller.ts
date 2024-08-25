import { Controller, Param, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.schema';
import { BaseController } from '../../controllers/app.controller';

@Controller('order')
export class OrderController extends BaseController<OrderService, Order> {
  constructor(orderService: OrderService) {
    super(orderService);
  }

}
