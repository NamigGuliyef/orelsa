"use client";

import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { ProductDetail } from "@/Utils/db";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const ShopRooms = ({
  numberOfProducts,
  onSendData,
}: {
  numberOfProducts: number;
  onSendData: (num: number) => void;
}) => {
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Hal-hazırkı səhifə nömrəsi
  const itemsPerPage = 16; // Hər səhifədəki məhsul sayı

  const productsRef = useRef<HTMLDivElement>(null); // Məhsul hissəsinə ref təyin edin

  useEffect(() => {
    const getProductsList = async () => {
      const url = "https://orelsa.vercel.app/guest/product";

      try {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProducts(data);
        onSendData(data?.length ?? 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProductsList();
  }, [onSendData]);

  // Məhsulları səhifələrə görə bölmək
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Səhifə sayını hesablamaq
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Səhifə nömrəsini dəyişmək üçün funksiya
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Məhsulların başladığı hissəyə keçmək
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section>
      {/* Məhsullar siyahısı */}
      <div ref={productsRef} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {currentProducts.map((product: ProductDetail) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="flex items-center">No products available.</p>
      )}

      {/* Pagination düymələri */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 ${
                currentPage === index + 1
                  ? "bg-orange-500 text-white"
                  : "bg-orange-200 hover:bg-orange-300"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        
        </div>
      )}
    </section>
  );
};

export default ShopRooms;
