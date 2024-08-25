import { Controller, Get, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './pages/items/items.module';
import { OrderModule } from './pages/order/order.module';
import { RecipesModule } from './pages/recipes/recipes.module';
@Controller()
export class AppController {
  @Get('/')
  getHello(): string {
    return 'Hello World! V2';
  }
}

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pos'), // เชื่อมต่อกับ MongoDB
    ItemsModule,
    OrderModule,
    RecipesModule
  ],
  controllers: [AppController], // fore test
})
export class AppModule {}
