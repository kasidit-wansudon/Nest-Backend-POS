import { Schema, Document } from 'mongoose';
export interface Order extends Document {
  customerName: string;
  items: { item: Schema.Types.ObjectId; quantity: number }[]; // เชื่อมโยงกับ Item
  totalAmount: number;
  status: string;
  createdAt: Date;
}

export const OrderSchema = new Schema<Order>({
  customerName: { type: String, required: true },
  items: [
    {
      item: { type: Schema.Types.ObjectId, ref: 'items', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
