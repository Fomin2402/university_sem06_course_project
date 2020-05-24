export const API_AUTH: IAuthAPI = {
  POST_LOGIN: "login",
  POST_SIGN_UP: "signup",
  POST_REQ_FOR_RESET_PASS: "req-for-reset",
  POST_RESET_PASS: "reset",
};

export const API_ADMIN: IAdminAPI = {
  GRANT_ROLE: (userId: string) => `admin/grant/${userId}`,
};

export const API_CART: ICartAPI = {
  GET: "cart",
  POST_CART: (productId: string) => `cart/${productId}`,
  DELETE_CART: (productId: string) => `cart/${productId}`,
};

export const API_ORDER: IOrderAPI = {
  GET_ORDERS: "order",
  GET_ORDER_BY_ID: (orderId: string) => `order/${orderId}`,
  GET_INVOICE_BY_ORDER_ID: (orderId: string) => `order/invoice/${orderId}`,
  POST_ORDER: "order",
};

export const API_PRODUCT: IProductAPI = {
    GET_PRODUCTS: "product",
    GET_PRODUCT_BY_ID: (productId: string) => `product/${productId}`,
    POST_PRODUCT: "product",
    PATCH_PRODUCT: (productId: string) => `product/${productId}`,
    DELEETE_PRODUCT: (productId: string) => `product/${productId}`,
};

export const API_MEDIA: 'images' = 'images';