import { apiService } from "./api";
import { IProduct } from "./product";

export interface ICategory {
  categoryName: string;
  id: number;
  imageUrl: string;
  products: IProduct[];
}

export const categoryApi = {
  getCategories: () =>
    apiService.get<ICategory[]>("/category/"),
};
