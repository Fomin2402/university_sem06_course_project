import mongoose, { Schema } from 'mongoose';
import { IProduct } from './product';

interface IOrderItem {
    product: IProduct;
    quantity: number;
}

export interface IOrder extends mongoose.Document {
    products: IOrderItem[];
    user: {
        email: string;
        userId: string;
    };
}

const orderSchema = new Schema({
    products: [
        {
            product: { type: Object, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    user: {
        email: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
});

export const Order = mongoose.model('Order', orderSchema);
