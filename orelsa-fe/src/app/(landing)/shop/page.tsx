"use client";

import Quality from "@/components/UI/Quality/Quality";
import ShopRooms from "@/components/UI/ShopRooms/ShopRooms";
import LandingContainer from "@/components/Views/Landing/LandingContainer";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import currency from "currency.js";
import { toNumber } from "lodash-es";
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

  const handleNumberOfProductsChange = (numberOfProducts: {
    0: string;
    anchorKey: string;
    currentKey: string;
  }): void => {
    setSelectedNumberOfProducts(toNumber(numberOfProducts?.currentKey) ?? 16);
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
            <div className="flex justify-between items-center gap-6">
              <div className="flex justify-center items-center gap-8">
                <p>
                  {`Göstərilən ${
                    currency(selectedNumberOfProducts).subtract(currency(15))
                      ?.value
                  } – 
                  ${Math.min(childDataLength, selectedNumberOfProducts)} 
                   of ${childDataLength} nəticə`}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center gap-4">
              <div className="flex justify-center items-center gap-4">
                <p className="">Göstərilən:</p>
                <Dropdown className="w-[4rem] bg-slate-50">
                  <DropdownTrigger>
                    <Button variant="bordered" className="capitalize">
                      {selectedNumberOfProducts}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Number of products to show"
                    variant="flat"
                    selectionMode="single"
                    selectedKeys={new Set([selectedNumberOfProducts])}
                    onSelectionChange={handleNumberOfProductsChange}
                  >
                    {dropdownItems.map((item) => (
                      <DropdownItem key={item}>{item}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
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
