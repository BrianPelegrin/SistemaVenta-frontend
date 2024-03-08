import sistemApi from "@/api/sistem-api";
import { IApiResponse, IBaseModel } from "@/interfaces";
import { reactive } from "vue";

interface IRequestData<T> {
  list: T[];
  record: T;
  isLoading: boolean;
}
interface IRequestService<T> {
  getList: (query?: string) => Promise<T[]>;
  getById: (id: number) => Promise<T | undefined>;
  saveRecord: (record: T) => Promise<T>;
  deleteRecord: (id: number) => Promise<void>;
  requestData: IRequestData<T>;
}

const useRequestService = <T extends IBaseModel>(
  url: string
): IRequestService<T> => {
  const requestData = reactive<IRequestData<T>>({
    list: [],
    record: {} as T,
    isLoading: false,
  }) as IRequestData<T>;

  const getList = async (): Promise<T[]> => {
    try {
      requestData.isLoading = true;
      const { data } = await sistemApi.get<IApiResponse<T[]>>(url);
      requestData.list = data.data;
      requestData.isLoading = false;

      return data.data;
    } catch (error: any) {
      requestData.isLoading = false;
      console.warn(error);
      return [] as T[];
    }
  };

  const getById = async (id: number): Promise<T> => {
    try {
      requestData.isLoading = true;
      const { data } = await sistemApi.get<IApiResponse<T>>(`${url}/${id}`);
      requestData.record = data.data;
      requestData.isLoading = false;

      return data.data;
    } catch (error: any) {
      requestData.isLoading = false;
      throw new Error(error);
    }
  };

  const saveRecord = async (record: T): Promise<T> => {
    try {
      requestData.isLoading = true;
      let savedRecord: T;
      if (!record.id) {
        const { data } = await sistemApi.post<IApiResponse<T>>(url, record);
        savedRecord = data.data;
      } else {
        const { data } = await sistemApi.put<IApiResponse<T>>(url, record);
        savedRecord = data.data;
      }
      requestData.isLoading = false;
      return savedRecord;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const deleteRecord = async (id: number): Promise<void> => {
    try {
      requestData.isLoading = true;
      await sistemApi.delete<IApiResponse<T[]>>(`${url}/${id}`);
      requestData.isLoading = false;
    } catch (error: any) {
      console.warn(error);
      requestData.isLoading = false;
    }
  };

  return {
    getList,
    getById,
    saveRecord,
    deleteRecord,
    requestData,
  };
};

export default useRequestService;
