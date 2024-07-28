import { IProduct } from "./product.types";

export interface ICartItemProps {
  id: number;
  name: string;
  imageURL: string;
  price: number;
  quantity: number;
  description: string;
  increment: () => void;
  decrement: () => void;
  remove: () => void;
}

export interface ICartItem {
  id: number;
  product: IProduct;
  quantity: number; 
}

export interface ICart {
  cartItems: ICartItem[];
  totalCost: number;
}

export interface ICartContextType {
  cart: ICart | null;
  loading: boolean;
  error: string | null;
  addItem: (productId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  updateQuantity: (
    cartItemId: number,
    productId: number,
    quantity: number
  ) => Promise<void>;
  refreshCart: (setToEmpty?: boolean) => Promise<void>;
  incrementQuantity: (cartItemId: number, productId: number) => Promise<void>;
  decrementQuantity: (cartItemId: number, productId: number) => Promise<void>;
  getTotalCost: () => number | undefined;
}
