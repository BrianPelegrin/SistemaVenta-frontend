interface ICategory {
  id: number;
  name: string;
  stateId: number;
  products?: any[];
  isActive?: boolean;
}
interface ISupplier extends ICategory {
  email: string;
  phoneNumber: string;
}
interface IState {
  id: number;
  name: string;
}

export type { ICategory, IState, ISupplier };
