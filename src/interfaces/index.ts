interface IModule {
  label: string;
  icon?: string;
  path: string;
  childs?: IModule[];
}
interface IApiResponse<TData> {
  message: string;
  data: TData;
}

export type { IModule, IApiResponse };
