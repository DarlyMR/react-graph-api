import React from "react";
import { Package } from "lucide-react";
import { Product } from "../utils/interfaces/product.interface";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 transition-transform hover:scale-[1.02]">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="flex-1 w-full">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{product.brand}</h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
            {product.master_brand && `${product.master_brand} - `}
            {product.desc}
          </p>
          <div className="space-y-2">
            <div className="flex items-center">
              <Package className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-600 line-clamp-1">{product.variety?.join(", ") || "N/A"}</span>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-xs sm:text-sm">
              <div className="flex flex-col xs:flex-row xs:items-center gap-1">
                <span className="font-medium whitespace-nowrap">Tamaño:</span>
                <span className="text-gray-600">
                  {product.size} {product.w_simbol}
                </span>
              </div>
              <div className="flex flex-col xs:flex-row xs:items-center gap-1">
                <span className="font-medium whitespace-nowrap">Precio:</span>
                <span className="text-gray-600">${parseFloat(product.price || "0").toFixed(2)}</span>
              </div>
              <div className="flex flex-col xs:flex-row xs:items-center gap-1">
                <span className="font-medium whitespace-nowrap">UPC:</span>
                <span className="text-gray-600">{product.upc}</span>
              </div>
              <div className="flex flex-col xs:flex-row xs:items-center gap-1">
                <span className="font-medium whitespace-nowrap">Empaque:</span>
                <span className="text-gray-600">{product.embase}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className={`px-2 py-1 text-xs rounded-full ${product.status_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{product.status_active ? "Activo" : "Inactivo"}</span>
        </div>
      </div>
    </div>
  );
};
