import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { BaseControllerServiceModel } from 'src/models/base.controller.model';

export class BaseController<TService extends BaseControllerServiceModel<TEntity>, TEntity> {
  protected readonly service: TService;

  constructor(service: TService) {
    this.service = service;
  }

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Get('/all')
  async findAll2() {
    return await this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Post()
  async create(@Body() createDto: any) {
    return await this.service.create(createDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() newValue: Partial<TEntity>) {
    return await this.service.update(id, newValue);
  }
}
