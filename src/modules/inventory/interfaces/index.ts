import { IBaseModel } from "@/interfaces";

interface IProduct extends IBaseModel {
  id: number;
  name: string;
  description: string;
  barCode: string;
  salePrice: number | null;
  pucharsePrice: number | null;
  stock: number | null;
  minimalStock: number | null;
  image: string;
  //relations ids
  categoryId: number | null;
  stateId: number;
  unitMeasurementId: number | null;
  //relations objects
  category?: ICategory;
  supplier?: ISupplier;
  state?: IState;
  inventoryMovements?: any[];
  //front-end utils
  isActive?: boolean;
}
interface ICategory extends IBaseModel {
  id: number;
  name: string;
  stateId: number;
  products?: IProduct[];
  isActive?: boolean;
}
interface ILot extends IBaseModel{
  id: number;
  name: string;
  stateId: number;
  products?: IProduct;
  isActive?: boolean
}

interface ISupplier extends IBaseModel {
  email: string;
  phoneNumber: string;
  products?: IProduct[];
  isActive: boolean;
  name: string;
}

interface IState extends IBaseModel {
  name: string;
}

export type { ICategory, IState, ISupplier, IProduct, ILot };
