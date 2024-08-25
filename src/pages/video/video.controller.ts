import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './video.schema';

@Controller('video') // กำหนด base path เป็น /video
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  // GET /video - ดึงข้อมูลวิดีโอทั้งหมด
  @Get()
  async findAll() {
    return await this.videoService.findAll();
  }

  // GET /video/:id - ดึงข้อมูลวิดีโอตาม ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.videoService.findById(id);
  }

  // POST /video - สร้างวิดีโอใหม่
  @Post()
  async create(@Body() createVideoDto: any) {
    return await this.videoService.create(createVideoDto);
  }

  // PUT /video/like/:id - เพิ่มจำนวนไลค์ให้วิดีโอตาม ID
  @Put('like/:id')
  async updateLike(@Param('id') id: string) {
    return await this.videoService.updateLike(id);
  }

  @Delete(':id')
  async deleteVideo(@Param('id') id: string) {
    return await this.videoService.delete(id);
  }

  @Put(':id')
  async updateVideo(@Param('id') id: string, @Body() newValue: Partial<Video>) {
    return await this.videoService.update(id, newValue);
  }
  
}
