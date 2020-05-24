interface IProductsShell {
  products: IProduct[];
}

interface IProduct {
  title: string;
  price: number;
  description: string;
  imageUrl?: string;
  userId: string;
}
