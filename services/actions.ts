"use server";
import { productApi } from "./product";

const getProducts = async () => {
  try {
    const data = await productApi.getProducts()
        return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export { getProducts };
