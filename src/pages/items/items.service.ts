import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/services/base.service';
import { items } from './items.schema';
@Injectable()
export class ItemsService extends BaseService<items> {
  constructor(@InjectModel('Items') private readonly ItemsModel: Model<items>) {
    super(ItemsModel);
  }
  async findAll() {
    return await this.ItemsModel.find({}).sort({score: 'desc'}).exec();
  }

  async updateLike(id: string) {
    const ItemsList = await this.ItemsModel.find({ _id: id }).exec();
    await this.ItemsModel.updateOne(
      { _id: id },
      { like: ItemsList[0].like + 1 , score: ItemsList[0].score + 5 },
      { upsert: true },
    ).exec();
  }

  async create(createItemsDto: any): Promise<any> {
    const createdItems = new this.ItemsModel(createItemsDto);
    return await createdItems.save();
  }

  async delete(id: string): Promise<any> {
    return await this.ItemsModel.findByIdAndDelete(id).exec();
  }
}
