// Interfaces
export interface IPostAdminDashboard {
  title: string;
  description: string;
  photo: any;
}

export interface IGetAdminDashboard {
  messaje: string;
}

export interface IPatchAdminDashboardHomeNewCollectionById {
  id: string;
  title: string;
  description: string;
  photo: string;
}

export interface iDelAdminDashboardhomeNewCollection {
  id: string;
}

export interface IGetAdminDashboardHomeNewCollectionById {
  id: string;
}

export interface IGetAdminDashboardHomeBrowseRange {
  description: string;
  photo: string;
}

export interface IPosthAdminDashboardHomeBrowseRange {
  description: string;
  photo: string;
}

export interface IPatchhAdminDashboardHomeBrowseRangeById {
  id: string;
  description: string;
  photo: string;
}

export interface IDelAdminDashboardHomeBrowseRangeById {
  id: string;
}

export interface IGetAdminDashboardHomeBrowseRangeById {
  id: string;
}

export interface IPostAdminDashboardProduct {
  name: string;
  description: string;
  price: number;
  discount: number;
  model_no: string;
  category: string;
  new: boolean;
  photos: [];
  active: boolean;
}

export interface IPatchAdminDashboardProductById {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  model_no: string;
  category: string;
  new: boolean;
  photos: [];
  active: boolean;
}

export interface IDelAdminDashboardProductById {
  id: string;
}

export interface IGetAdminDashboardProductById {
  id: string;
}

export interface IGetAdminDashboardContact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGetAdminDashboardSubscribe {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface INewCollection {
  products: string;
  editingId: string;
  setEditingId: string;
  handleChange: boolean;
  handleDelete: boolean;
}
