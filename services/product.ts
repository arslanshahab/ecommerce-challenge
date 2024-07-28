import { IProduct } from "@/types/product.types";
import { apiService } from "./api";

export const productApi = {
  getProducts: () =>
    apiService.get<IProduct[]>("/product/"),
};
