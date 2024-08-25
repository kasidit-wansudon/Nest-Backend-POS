import { Schema, Document } from 'mongoose';
export interface Items extends Document {
  name: string;
  price: number;
  recipe: Schema.Types.ObjectId; // เชื่อมโยงกับ Recipe
}

export const ItemsSchema = new Schema<Items>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' }
});