import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "../../../components/ProductCard";
import { Product } from "../../../utils/interfaces/product.interface";
import { getProductsPaginated } from "../../../services/product.service";

export const DashboardPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const productsPerPage = 6;

  const processBrandData = (products: Product[]): [string, string | number][] => {
    const brandCount = products.reduce((acc, product) => {
      const brand = product.brand || "Sin marca";
      acc[brand] = (acc[brand] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [["Brand", "Products"], ...Object.entries(brandCount)];
  };

  const processVarietyData = (products: Product[]): [string, string | number][] => {
    const varietyCount = products.reduce((acc, product) => {
      const varieties = product.variety || ["Sin variedad"];
      varieties.forEach((variety) => {
        const cleanVariety = variety.replace(/[\"]/g, "");
        acc[cleanVariety] = (acc[cleanVariety] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return [["Variety", "Products"], ...Object.entries(varietyCount)];
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getProductsPaginated(currentPage).then((data) => {
      setProducts(data.products);
    });
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Distribución por Marca</h3>
          <Chart
            chartType="PieChart"
            data={processBrandData(products)}
            options={{
              is3D: false,
              backgroundColor: "transparent",
              chartArea: { width: "100%", height: "80%" },
              legend: { position: "bottom" },
            }}
            width="100%"
            height="300px"
          />
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Distribución por Variedad</h3>
          <Chart
            chartType="BarChart"
            data={processVarietyData(products)}
            options={{
              backgroundColor: "transparent",
              chartArea: { width: "70%", height: "80%" },
              hAxis: { title: "Cantidad" },
              vAxis: { title: "Variedad" },
              legend: { position: "none" },
            }}
            width="100%"
            height="300px"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold">Productos</h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-4 gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </button>
            <span className="text-sm text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
