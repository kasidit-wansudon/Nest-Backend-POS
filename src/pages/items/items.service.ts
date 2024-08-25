import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/services/base.service';
import { Items } from './items.schema';
@Injectable()
export class ItemsService extends BaseService<Items> {
  constructor(@InjectModel('Items') private readonly ItemsModel: Model<Items>) {
    super(ItemsModel);
  }
}
