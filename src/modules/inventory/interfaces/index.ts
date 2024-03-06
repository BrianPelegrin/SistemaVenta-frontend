interface IProduct {
  id: number;
  name: string;
  description: string;
  barCode: string;
  salePrice: number;
  pucharsePrice: number;
  stock: number;
  minimalStock: number;
  image: string;
  //relations ids
  storageId: number;
  supplierId: number;
  categoryId: number;
  stateId: number;
  unitMeasurementId: number;
  //relations objects
  category?: ICategory;
  supplier?: ISupplier;
  state?: IState;
  inventoryMovements?: any[];
  //front-end utils
  isActive?: boolean;
}
interface ICategory {
  id: number;
  name: string;
  stateId: number;
  products?: IProduct[];
  isActive?: boolean;
}
interface ISupplier extends ICategory {
  email: string;
  phoneNumber: string;
  products?: IProduct[];
}
interface IState {
  id: number;
  name: string;
}

export type { ICategory, IState, ISupplier, IProduct };
