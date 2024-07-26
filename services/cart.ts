import { apiService } from "./api";

export interface Product {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  price: number;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Cart {
  cartItems: CartItem[];
  totalCost: number;
}

export const cartApi = {
  getCart: (token: string) =>
    apiService.get<Cart>("/cart/", { params: { token } }),

  addToCart: (token: string, productId: number, quantity: number) =>
    apiService.post(
      "/cart/add",
      { productId, quantity },
      { params: { token } }
    ),

  removeFromCart: (token: string, cartItemId: number) =>
    apiService.delete(`/cart/delete/${cartItemId}`, { params: { token } }),

  updateCartItem: (
    token: string,
    id: number,
    productId: number,
    quantity: number
  ) =>
    apiService.put(
      `/cart/update/${id}`,
      { id, productId, quantity },
      { params: { token } }
    ),
};
