"use client";

import { getAllProducts } from "@/api/ui/requests";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import LandingContainer from "@/components/Views/Landing/LandingContainer";
import { IProduct } from "@/interface/ui";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

const OurProducts: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const [products, setNewProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setNewProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section>
      <LandingContainer>
        <div className="w-full">
          <h2 className="text-4xl font-extrabold text-center text-[#333333] mb-6">
            Bizim məhsullar
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {products
              .slice(0, showMore ? products.length : 8)
              .map((product: IProduct) => {
                return (
                  product?.active && (
                    <ProductCard key={product?._id} {...product} />
                  )
                );
              })}
          </div>
          <div className="w-full my-6 flex justify-center">
            <Button
              variant="solid"
              color="default"
              className="border-2 border-[#B88E2F] bg-white text-center py-8 px-16 font-semibold text-base text-[#B88E2F]"
              onClick={() => setShowMore((pre) => !pre)}
            >
              {showMore ? "Gizlət" : "Hamısına bax"}
            </Button>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
};

export default OurProducts;
