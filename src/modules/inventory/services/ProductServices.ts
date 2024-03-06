import sistemApi from "@/api/sistem-api";
import type { IApiResponse } from "@/interfaces";
import type { IProduct } from "@/modules/inventory/interfaces";

export default {
  getProducts: async (
    queryFilter: string | undefined = undefined
  ): Promise<IProduct[] | undefined> => {
    try {
      const { data } = await sistemApi<IApiResponse<IProduct[]>>(
        `/inventory/products${queryFilter ?? ""}`
      );

      return data.data;
    } catch (error: any) {
      console.log(error);
      return;
    }
  },
};
