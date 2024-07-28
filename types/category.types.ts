import { IProduct } from "./product.types";

export interface ICategory {
  categoryName: string;
  id: number;
  imageUrl: string;
  products: IProduct[];
}
