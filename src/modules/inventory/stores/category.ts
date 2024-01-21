import { ref } from "vue";
import { defineStore } from "pinia";
import { ICategory } from "../interfaces";
import sistemApi from "@/api/sistem-api";
import { IApiResponse } from "@/interfaces";

const useCategoryStore = defineStore("category-store", () => {
  const isLoading = ref<boolean>(false);
  const categories = ref<ICategory[]>([]);
  const category = ref<ICategory>();

  const getCategories = async () => {
    isLoading.value = true;
    try {
      const { data } = await sistemApi.get<IApiResponse<ICategory[]>>(
        "/categories"
      );

      categories.value = data.data.map((x) => {
        x.isActive = x.stateId == 1;
        return x;
      });
    } catch (error: any) {}
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  };

  const getCategory = async (id: number | string) => {
    isLoading.value = true;
    try {
      const { data } = await sistemApi.get<IApiResponse<ICategory>>(
        `/categories/${id}`
      );

      category.value = data.data;
    } catch (error: any) {}
    isLoading.value = false;
  };

  const postCategory = async (categoryToAdd: ICategory) => {
    isLoading.value = true;
    try {
      const { data } = await sistemApi.post<IApiResponse<ICategory>>(
        "/categories",
        categoryToAdd
      );

      category.value = data.data;
    } catch (error: any) {}
    isLoading.value = false;
  };

  const updateCategory = async (categoryToUpdate: ICategory) => {
    if (!categoryToUpdate.id) return;
    isLoading.value = true;
    try {
      const { data } = await sistemApi.put<IApiResponse<ICategory>>(
        "/categories",
        categoryToUpdate
      );

      category.value = data.data;
    } catch (error: any) {}
    isLoading.value = false;
  };

  return {
    isLoading,
    categories,
    category,
    getCategories,
    getCategory,
    postCategory,
    updateCategory,
  };
});

export default useCategoryStore;
