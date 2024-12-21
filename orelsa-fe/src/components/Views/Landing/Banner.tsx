"use client";
import axios from "axios";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

const Banner = () => {
  const [newCollection, setNewCollection] = useState<any[]>([]);
  const url = "https://orelsa.vercel.app/guest/homeNewCollection";

  useEffect(() => {
    axios
      .get(url)
      .then(({ data }) => {
        setNewCollection(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div
      className="bg-no-repeat bg-cover h-screen flex justify-end items-center"
      style={{
        backgroundImage: `url("${newCollection[0]?.newproductPhoto}")`,
        backgroundSize: "cover", // Şəkili tam ölçüdə göstərmək üçün 'cover' istifadə olunur
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-[600px] shadow-2xl bg-white bg-opacity-40 rounded-[16px] px-6 py-8 mx-5">
        <h2 className="ml-0 md:ml-4 mt-4 font-bold text-[32px] sm:text-[42px] lg:text-[52px] text-[#B88E2F]">
          {newCollection[0]?.title}
        </h2>
        <p className="ml-0 md:ml-4 text-black mt-6 sm:mt-9 text-base sm:text-lg font-medium text-wrap max-w-full">
          {newCollection[0]?.description}
        </p>
        <div className="ml-0 md:ml-4 pb-6 sm:pb-10 pt-6 sm:pt-9">
          <Link href="https://wa.me/+994559706747" passHref>
            <Button className="gap-3 bg-[#B88E2F] w-full sm:w-[222px] h-[60px] sm:h-[75px] font-bold text-base text-white">
              İndi sifariş et
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
