interface IModule {
  label: string;
  icon?: string;
  path: string;
  childs?: IModule[];
}

export type { IModule };
