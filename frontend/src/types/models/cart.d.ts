interface IMongoCartItem {
  productId: IProduct;
  quantity: number;
  _id: string;
}

interface IMongoCart {
  products: IMongoCartItem[];
}

interface ICart {
  products: IProduct[];
}
