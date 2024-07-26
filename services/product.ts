import { apiService } from "./api";

export interface IProduct {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  imageURL: string;
  price: number;
}
export const productApi = {
  getProducts: () =>
    apiService.get<IProduct[]>("/product/"),
};
