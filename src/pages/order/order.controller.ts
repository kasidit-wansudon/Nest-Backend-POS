import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.schema';

@Controller('order') // กำหนด base path เป็น /Order
export class OrderController {
  constructor(private readonly OrderService: OrderService) {}

  // GET /Order - ดึงข้อมูลวิดีโอทั้งหมด
  @Get()
  async findAll() {
    return await this.OrderService.findAll();
  }

  // GET /Order/:id - ดึงข้อมูลวิดีโอตาม ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.OrderService.findById(id);
  }

  // POST /Order - สร้างวิดีโอใหม่
  @Post()
  async create(@Body() createOrderDto: any) {
    return await this.OrderService.create(createOrderDto);
  }

  // PUT /Order/like/:id - เพิ่มจำนวนไลค์ให้วิดีโอตาม ID
  @Put('like/:id')
  async updateLike(@Param('id') id: string) {
    return await this.OrderService.updateLike(id);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return await this.OrderService.delete(id);
  }

  @Put(':id')
  async updateOrder(@Param('id') id: string, @Body() newValue: Partial<Order>) {
    return await this.OrderService.update(id, newValue);
  }
  
}
