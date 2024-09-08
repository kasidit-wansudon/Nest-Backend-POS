import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // เปิดใช้งาน CORS
  app.use(cors({
    origin: 'http://localhost:3001',  // อนุญาตเฉพาะจาก localhost:3001
  }));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  
}
bootstrap();
