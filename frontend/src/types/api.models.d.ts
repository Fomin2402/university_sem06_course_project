interface IAuthAPI {
  POST_LOGIN: "login";
  POST_SIGN_UP: "signup";
  POST_REQ_FOR_RESET_PASS: "req-for-reset";
  POST_RESET_PASS: "reset";
}

interface IAdminAPI {
  GRANT_ROLE: (userId: string) => string;
}

interface ICartAPI {
  GET: "cart";
  POST_CART: (productId: string) => string;
  DELETE_CART: (productId: string) => string;
}

interface IOrderAPI {
  GET_ORDERS: "order";
  GET_ORDER_BY_ID: (orderId: string) => string;
  GET_INVOICE_BY_ORDER_ID: (orderId: string) => string;
  POST_ORDER: "order";
}

interface IProductAPI {
  GET_PRODUCTS: "product";
  GET_PRODUCT_BY_ID: (productId: string) => string;
  POST_PRODUCT: "product";
  PATCH_PRODUCT: (productId: string) => string;
  DELEETE_PRODUCT: (productId: string) => string;
}
