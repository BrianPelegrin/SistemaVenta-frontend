import sistemApi from "@/api/sistem-api";
import { IApiResponse } from "@/interfaces";
import { reactive } from "vue";

interface IRequestData<T> {
  list: T[];
  record: T;
}
interface IRequestService<T> {
  getList: () => Promise<T[]>;
  getById: () => Promise<T | undefined>;
  saveRecord: (data: T) => Promise<T>;
  deleteRecord: (id: number) => Promise<void>;
  isLoading: boolean;
  requestData: IRequestData<T>;
}

const useRequestService = <T>(url: string): IRequestService<T> => {
  const requestData = reactive<IRequestData<T>>({
    list: [],
    record: {} as T,
  }) as IRequestData<T>;

  const getList = async (): Promise<T[]> => {
    try {
      const { data } = await sistemApi.get<IApiResponse<T[]>>(url);
      requestData.list = data.data;
      return data.data;
    } catch (error: any) {
      return [] as T[];
      console.warn(error);
    }
  };

  const getById = async (): Promise<T> => {
    try {
      const { data } = await sistemApi.get<IApiResponse<T>>(url);
      requestData.record = data.data;
      return data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return {
    getList,
    getById,
    requestData,
    isLoading: false,
  };
};

export default useRequestService;
