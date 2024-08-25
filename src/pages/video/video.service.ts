import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppService } from 'src/services/app.service';
import { Video } from './video.schema';
@Injectable()
export class VideoService extends AppService<Video> {
  constructor(@InjectModel('videos') private readonly videoModel: Model<Video>) {
    super(videoModel);
  }
  async findAll() {
    return await this.videoModel.find({}).sort({score: 'desc'}).exec();
  }

  async updateLike(id: string) {
    const videoList = await this.videoModel.find({ _id: id }).exec();
    await this.videoModel.updateOne(
      { _id: id },
      { like: videoList[0].like + 1 , score: videoList[0].score + 5 },
      { upsert: true },
    ).exec();
  }

  async create(createVideoDto: any): Promise<any> {
    const createdVideo = new this.videoModel(createVideoDto);
    return await createdVideo.save();
  }

  async delete(id: string): Promise<any> {
    return await this.videoModel.findByIdAndDelete(id).exec();
  }
}
