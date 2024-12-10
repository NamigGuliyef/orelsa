"use client";

import ProductCard from "@/components/shared/ProductCard/ProductCard";
import LandingContainer from "@/components/Views/Landing/LandingContainer";
import { IProduct } from "@/interface/ui";
import { ProductDetail } from "@/Utils/db";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

type RelatedProducts = {
  relatedProducts: IProduct;
};

const RelatedProducts = ({ relatedProducts }: RelatedProducts) => {
  const [showMore, setShowMore] = useState(false);
  const [newRelatedProducts, setNewRelatedProducts] = useState([]);

  useEffect(() => {
    setNewRelatedProducts(relatedProducts as never);
  }, [relatedProducts]);

  return (
    <section>
      <LandingContainer>
        <div className=" w-full h-full ">
          <div className=" flex justify-center items-center mb-6">
            <h3 className="font-medium text-4xl">Related Products</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {newRelatedProducts
              .slice(0, showMore ? newRelatedProducts.length : 4)
              .map((newRelatedProduct: ProductDetail) => {
                return (
                  <ProductCard
                    key={newRelatedProduct?._id}
                    {...newRelatedProduct}
                  />
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

export default RelatedProducts;
