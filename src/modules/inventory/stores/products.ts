import { ref } from "vue";
import { defineStore } from "pinia";
import { IProduct } from "@/modules/inventory/interfaces";
import sistemApi from "@/api/sistem-api";
import { IApiResponse } from "@/interfaces";

const useProductStore = defineStore("product-store", () => {
  const isLoading = ref<boolean>(false);
  const products = ref<IProduct[]>([]);
  const product = ref<IProduct>();

  const getProducts = async () => {
    isLoading.value = true;
    try {
      const { data } = await sistemApi.get<IApiResponse<IProduct[]>>(
        "/inventory/products"
      );

      products.value = data.data;
    } catch (error: any) {}

    isLoading.value = false;
  };

  const getProduct = async (id: number | string) => {
    isLoading.value = true;
    try {
      const { data } = await sistemApi.get<IApiResponse<IProduct>>(
        `/inventory/products/${id}`
      );

      product.value = data.data;
    } catch (error: any) {}
    isLoading.value = false;
  };

  const postProduct = async (productToAdd: IProduct) => {
    isLoading.value = true;
    try {
      const { data } = await sistemApi.post<IApiResponse<IProduct>>(
        "/inventory/products",
        productToAdd
      );

      product.value = data.data;
    } catch (error: any) {}
    isLoading.value = false;
  };

  const updateProduct = async (productToUpdate: IProduct) => {
    if (!productToUpdate.id) return;
    isLoading.value = true;
    try {
      const { data } = await sistemApi.put<IApiResponse<IProduct>>(
        "/inventory/products",
        productToUpdate
      );

      product.value = data.data;
    } catch (error: any) {}
    isLoading.value = false;
  };

  return {
    isLoading,
    products,
    product,
    getProducts,
    getProduct,
    postProduct,
    updateProduct,
  };
});

export default useProductStore;
