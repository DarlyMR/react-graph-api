export interface RegisterCredentials {
  client_name: string;
  client_products: number[];
  address: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userData: RegisterCredentials;
}
