import { ProductResponse } from "../utils/interfaces/product.interface";
import { AuthService } from "./auth.service";

export const getProductsPaginated = async (page: number): Promise<ProductResponse> => {
  // Tal parece que no se puede hacer destructuracion accediendo a las variables de entorno
  //   const { VITE_API_URL, VITE_TOKEN } = import.meta.env.VITE_API_URL;
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const TOKEN = new AuthService().getToken();
  const response = await fetch(`${VITE_API_URL}/getProductLimit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ page }),
  });
  return response.json();
};
