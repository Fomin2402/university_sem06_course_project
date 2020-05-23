import mongoose, { Schema } from 'mongoose';

export interface IProduct extends mongoose.Document {
    title: string;
    price: number;
    description: string;
    imageUrl: string;
    userId: string;
}

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

export const Product = mongoose.model('Product', productSchema);
