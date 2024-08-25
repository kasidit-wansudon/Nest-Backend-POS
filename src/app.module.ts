import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './pages/items/items.module';
import { OrderModule } from './pages/order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pos'), // เชื่อมต่อกับ MongoDB
    ItemsModule, // Import ItemsModule
    OrderModule, // Import OrderModule
  ],
})
export class AppModule {}
