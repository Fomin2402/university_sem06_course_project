interface IMongoOrderProduct {
  _id: string;
  quantity: number;
  product: IProduct;
}

interface IMongoOrderUser {
  email: string;
  userId: string;
}

interface IMongoOrder {
  _id: string;
  user: IMongoOrderUser;
  products: IMongoOrderProduct[];
}

interface IOrder {
  orders: IMongoOrder[];
}
