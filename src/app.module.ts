import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoModule } from './pages/video/video.module';
import { OrderModule } from './pages/order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pos'), // เชื่อมต่อกับ MongoDB
    VideoModule, // Import VideoModule
    OrderModule, // Import OrderModule
  ],
})
export class AppModule {}
