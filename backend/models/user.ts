import mongoose, { Schema } from 'mongoose';
import { IProduct } from './product';

export interface ICartItem {
    productId: string;
    quantity: number;
}

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    cart: {
        items: ICartItem[];
    };
    isAdmin?: boolean;
    resetToken?: string;
    resetTokenExpiration?: Date | any;

    addToCart: (product: IProduct) => any;
    removeFromCart: (productId: string) => any;
    clearCart: () => any;
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: Boolean,
    resetToken: String,
    resetTokenExpiration: Date,
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: { type: Number, required: true },
            },
        ],
    },
});

userSchema.methods.addToCart = function (product: IProduct) {
    const cartProductIndex: number = this.cart.items.findIndex(
        (item: ICartItem) => {
            return item.productId.toString() === product._id.toString();
        }
    );
    let newQuantity: number = 1;
    const updatedCartItems: ICartItem[] = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity,
        });
    }

    this.cart = {
        items: updatedCartItems,
    };

    return this.save();
};

// TODO: add minus onee logic
userSchema.methods.removeFromCart = function (productId: string) {
    const updatedCartItems: ICartItem[] = this.cart.items.filter(
        (item: ICartItem) => {
            return item.productId.toString() !== productId.toString();
        }
    );
    this.cart.items = updatedCartItems;
    return this.save();
};

userSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
};

export const User = mongoose.model('User', userSchema);
