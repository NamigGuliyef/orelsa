"use client";

import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { ProductDetail } from "@/Utils/db";
import axios from "axios";
import { useEffect, useState } from "react";
import currency from "currency.js";

const ShopRooms = ({
  numberOfProducts,
  onSendData,
}: {
  numberOfProducts: number;
  onSendData: (num: number) => void;
}) => {
  const [products, setProducts] = useState<ProductDetail[]>([]);

  useEffect(() => {
    const getProductsList = async () => {
      const url = "http://localhost:9089/guest/product";

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
  }, []);

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-10 pb-3">
        {products
          .slice(
            currency(numberOfProducts).subtract(16)?.value,
            Math.min(numberOfProducts, products.length)
          )
          .map((product: ProductDetail) => (
            <ProductCard key={product._id} {...product} />
          ))}
      </div>
      {products.length === 0 && (
        <p className="flex items-center">No products available.</p>
      )}
    </section>
  );
};

export default ShopRooms;
