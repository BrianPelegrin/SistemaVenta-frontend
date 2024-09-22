interface IModule {
  label: string;
  icon?: string;
  path: string;
  childs?: IModule[];
}

interface IBaseModel {
  id: number;
  stateId: number;
  createdBy?: string;
  updatedBy?: string;
  updatedAt?: Date;
  createdAt?: Date;
  isActive?: boolean;
}

interface IApiResponse<TData> {
  message: string;
  data: TData;
}

export type { IModule, IApiResponse, IBaseModel };
