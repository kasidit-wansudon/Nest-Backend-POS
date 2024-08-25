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
  async findAll() {
    return await this.orderModel.find({}).sort({score: 'desc'}).exec();
  }

  async updateLike(id: string) {
    const OrderList = await this.orderModel.find({ _id: id }).exec();
    await this.orderModel.updateOne(
      { _id: id },
      { like: OrderList[0].like + 1 , score: OrderList[0].score + 5 },
      { upsert: true },
    ).exec();
  }
  
  async create(createOrderDto: any): Promise<Order> {
    return await super.create(createOrderDto);
  }

  async delete(id: string): Promise<any> {
    return await this.orderModel.findByIdAndDelete(id).exec();
  }
}
