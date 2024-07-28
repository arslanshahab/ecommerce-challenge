import { apiService } from "./api";
import { ICategory } from "@/types/category.types";

export const categoryApi = {
  getCategories: () =>
    apiService.get<ICategory[]>("/category/"),
};
