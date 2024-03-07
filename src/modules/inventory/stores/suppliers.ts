import { ref } from "vue";
import { defineStore } from "pinia";
import { ISupplier } from "../interfaces";
import sistemApi from "@/api/sistem-api";
import { IApiResponse } from "@/interfaces";

const useSupplierStore = defineStore("supplier-store", () => {
  const isLoading = ref<boolean>(false);
  const suppliers = ref<ISupplier[]>([]);
  const supplier = ref<ISupplier>();

  const getSuppliers = async () => {
    isLoading.value = true;
    try {
      const { data } = await sistemApi.get<IApiResponse<ISupplier[]>>(
        "/inventory/suppliers"
      );

      suppliers.value = data.data.map((x) => {
        x.isActive = x.stateId == 1;
        return x;
      });
    } catch (error: any) {}

    isLoading.value = false;
  };

  const getSupplier = async (id: number | string) => {
    isLoading.value = true;
    try {
      const { data } = await sistemApi.get<IApiResponse<ISupplier>>(
        `/inventory/suppliers/${id}`
      );

      supplier.value = data.data;
    } catch (error: any) {}
    isLoading.value = false;
  };

  const postSupplier = async (supplierToAdd: ISupplier) => {
    isLoading.value = true;
    try {
      const { data } = await sistemApi.post<IApiResponse<ISupplier>>(
        "/inventory/suppliers",
        supplierToAdd
      );

      supplier.value = data.data;
    } catch (error: any) {}
    isLoading.value = false;
  };

  const updateSupplier = async (supplierToUpdate: ISupplier) => {
    if (!supplierToUpdate.id) return;
    isLoading.value = true;
    try {
      const { data } = await sistemApi.put<IApiResponse<ISupplier>>(
        "/inventory/suppliers",
        supplierToUpdate
      );

      supplier.value = data.data;
    } catch (error: any) {}
    isLoading.value = false;
  };

  return {
    isLoading,
    suppliers,
    supplier,
    getSuppliers,
    getSupplier,
    postSupplier,
    updateSupplier,
  };
});

export default useSupplierStore;
