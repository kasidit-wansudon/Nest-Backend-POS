import { Schema, Document } from 'mongoose';
export interface Video extends Document {
  description: string;
  amount: number;
  customer: string;
  status: string;
  like: number;
  view: number;
  score: number;
}


export const VideoSchema = new Schema({
  description: String,
  sources: [String],
  subtitle: String,
  thumb: String,
  title: String,
  like: Number,
  view: Number,
  score: Number,
});