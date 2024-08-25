import { Controller, Injectable, Module } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { BaseController } from 'src/controllers/app.controller';
import { Schema, Document, Model } from 'mongoose';
import { BaseService } from 'src/services/base.service';

export interface Recipes extends Document {
  title: string;
  ingredients: string[];
  instructions: string;
  preparationTime: number;
  cookingTime: number;
  servings: number;
  category: string;
  createdAt: Date;
}

export const RecipesSchema = new Schema<Recipes>({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  preparationTime: { type: Number, required: true },
  cookingTime: { type: Number, required: true },
  servings: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
@Injectable()
export class RecipesService extends BaseService<Recipes> {
  constructor(@InjectModel('recipes') private readonly RecipesModel: Model<Recipes>) {
    super(RecipesModel);
  }
}
@Controller('recipes') // กำหนด base path เป็น /Recipes
  export class RecipesController extends BaseController<RecipesService, Recipes> {
    constructor(orderService: RecipesService) {
      super(orderService);
    }
  }



@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'recipes', schema: RecipesSchema }]), // กำหนดโมเดลและสคีมา
  ],
  providers: [RecipesService],
  controllers: [RecipesController], // รวม Controller
  exports: [RecipesService],
})
export class RecipesModule {}
