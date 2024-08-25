import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsService } from './items.service';
import { ItemsSchema } from './items.schema';
import { ItemsController } from './items.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'items', schema: ItemsSchema }]), // กำหนดโมเดลและสคีมา
  ],
  providers: [ItemsService],
  controllers: [ItemsController], // รวม Controller
  exports: [ItemsService],
})
export class ItemsModule {}
