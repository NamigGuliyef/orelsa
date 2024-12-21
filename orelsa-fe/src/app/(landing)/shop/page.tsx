"use client";

import Quality from "@/components/UI/Quality/Quality";
import ShopRooms from "@/components/UI/ShopRooms/ShopRooms";
import LandingContainer from "@/components/Views/Landing/LandingContainer";
import currency from "currency.js";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ShopPage() {
  const [selectedNumberOfProducts, setSelectedNumberOfProducts] =
    useState<number>(16);
  const [childDataLength, setChildDataLength] = useState<number>(0);
  const [dropdownItems, setDropdownItems] = useState<number[]>([]);

  useEffect(() => {
    const calculatedProductsToShow = Math.ceil(
      currency(childDataLength).divide(16)?.value
    );

    const items = Array.from(
      { length: calculatedProductsToShow },
      (_, index) => {
        return (index + 1) * 16;
      }
    );

    setDropdownItems(items);
  }, [childDataLength]);

  const handleChildData = (data: number) => {
    setChildDataLength(data);
  };

  const handleNumberOfProductsChange = (keys: string | Set<string> | { currentKey?: string }) => {
    let selectedKey = 16;

    if (typeof keys === "string") {
      selectedKey = parseInt(keys, 10);
    } else if (keys instanceof Set) {
      const firstKey = Array.from(keys)[0];
      selectedKey = parseInt(firstKey, 10);
    } else if (typeof keys === "object" && keys?.currentKey) {
      selectedKey = parseInt(keys.currentKey, 10);
    }
  
    setSelectedNumberOfProducts(selectedKey || 16);
  };
  

  return (
    <main className="w-full h-full overflow-hidden">
      <section className="bg-hero flex items-center justify-center min-h-[300px] w-full relative bg-no-repeat bg-center bg-cover">
        <div className="">
          <p className="mt-3 text-center font-medium text-5xl w-full p-2 ">
            Mağaza
          </p>

          <div className="flex justify-between items-center">
            <Link href="/" className="text-base font-bold">
              Ana səhifə
            </Link>

            <span className="font-bold">&gt;</span>

            <Link href="/shop" className="text-base font-medium">
              Mağaza
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-[#F9F1E7] py-6">
        <LandingContainer>
          <div className="flex justify-between items-center gap-6 w-full">
          </div>
        </LandingContainer>
      </section>
      <LandingContainer>
        <ShopRooms
          numberOfProducts={selectedNumberOfProducts}
          onSendData={handleChildData}
        />
      </LandingContainer>
      <Quality />
    </main>
  );
}
