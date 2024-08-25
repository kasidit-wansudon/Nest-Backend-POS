import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoService } from './video.service';
import { VideoSchema } from './video.schema';
import { VideoController } from './video.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'videos', schema: VideoSchema }]), // กำหนดโมเดลและสคีมา
  ],
  providers: [VideoService],
  controllers: [VideoController], // รวม Controller
  exports: [VideoService],
})
export class VideoModule {}
