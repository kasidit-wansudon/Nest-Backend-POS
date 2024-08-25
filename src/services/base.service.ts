import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';

@Injectable()
export class BaseService<T extends Document> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {  // ต้องรับ model ในคอนสตรัคเตอร์
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return await this.model.find({}).sort({ score: 'desc' }).exec();
  }

  async update(id: string, newValue: Partial<T>): Promise<T> {
    const item = await this.model.findById(id).exec();
    if (!item) {
      throw new Error('Item not found');
    }
    Object.assign(item, newValue);
    return await item.save();
  }

  async findById(id: string): Promise<T> {
    return await this.model.findById(id).exec();
  }

  async create(createDto: T): Promise<T> {
    const createdItem = new this.model(createDto);
    return await createdItem.save();
  }

  async delete(id: string): Promise<T> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
