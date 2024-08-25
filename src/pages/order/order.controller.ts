import { Controller, Param, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.schema';
import { BaseController } from 'src/controllers/app.controller';

@Controller('order')
export class OrderController extends BaseController<OrderService, Order> {
  constructor(orderService: OrderService) {
    super(orderService);
  }

  @Put('like/:id')
  async updateLike(@Param('id') id: string) {
    return await this.service.updateLike(id);
  }
}
