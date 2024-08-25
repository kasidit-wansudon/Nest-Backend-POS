import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Items } from './items.schema';
import { BaseController } from '../../controllers/app.controller';

@Controller('items') // กำหนด base path เป็น /items
  export class ItemsController extends BaseController<ItemsService, Items> {
    constructor(orderService: ItemsService) {
      super(orderService);
    }
  }
  
