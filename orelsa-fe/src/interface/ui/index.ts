export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  discount_price: number;
  photos: string[];
  new: { isNew: boolean };
  active: boolean;
}

export interface IProductById {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  discount_price: number;
  photos: string[];
  category: string;
  model_no: string;
}

export interface IHomeNewCoolection {
  id: string;
  title: string;
  description: string;
  newproductPhoto: string;
  active: boolean;
}
