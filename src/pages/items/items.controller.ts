import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { items } from './items.schema';

@Controller('items') // กำหนด base path เป็น /items
export class ItemsController {
  constructor(private readonly ItemsService: ItemsService) {}

  // GET /items - ดึงข้อมูลวิดีโอทั้งหมด
  @Get()
  async findAll() {
    return await this.ItemsService.findAll();
  }

  // GET /items/:id - ดึงข้อมูลวิดีโอตาม ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.ItemsService.findById(id);
  }

  // POST /items - สร้างวิดีโอใหม่
  @Post()
  async create(@Body() createItemsDto: any) {
    return await this.ItemsService.create(createItemsDto);
  }

  // PUT /items/like/:id - เพิ่มจำนวนไลค์ให้วิดีโอตาม ID
  @Put('like/:id')
  async updateLike(@Param('id') id: string) {
    return await this.ItemsService.updateLike(id);
  }

  @Delete(':id')
  async deleteItems(@Param('id') id: string) {
    return await this.ItemsService.delete(id);
  }

  @Put(':id')
  async updateItems(@Param('id') id: string, @Body() newValue: Partial<items>) {
    return await this.ItemsService.update(id, newValue);
  }
  
}
