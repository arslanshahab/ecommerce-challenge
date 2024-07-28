import { ICart } from "@/types/cart.types";
import { apiService } from "./api";


export const cartApi = {
  getCart: (token: string) =>
    apiService.get<ICart>("/cart/", { params: { token } }),

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
