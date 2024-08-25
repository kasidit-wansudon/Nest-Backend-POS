import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../../services/base.service';
import { Items } from './items.schema';
@Injectable()
export class ItemsService extends BaseService<Items> {
  constructor(@InjectModel('items') private readonly itemsModel: Model<Items>) {
    super(itemsModel);
  }
}
