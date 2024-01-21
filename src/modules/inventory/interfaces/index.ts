interface ICategory {
  id: number;
  name: string;
  stateId: number;
  products?: any[];
  isActive?: boolean;
}
interface IState {
  id: number;
  name: string;
}

export type { ICategory, IState };
