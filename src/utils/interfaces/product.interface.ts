export interface ProductResponse {
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  products: Product[];
  status: number;
}

export interface Product {
  images: any[];
  _id: string;
  url_image: string;
  id_category: number;
  brand: string;
  upc: string;
  size: string;
  variety: string[];
  price: string;
  desc: string;
  notes: string;
  quality_cf: string;
  type_of_meat: string;
  master_brand: string;
  type_of_cut: string;
  createdById: number;
  status_active: boolean;
  plu: string;
  pack: number;
  count: number;
  w_simbol: string;
  embase: string;
  createdAt?: string;
  updatedAt: string;
  id_product: number;
  __v: number;
  verify: boolean;
  per?: string;
}
