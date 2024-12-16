"use client";
import axios from "axios";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import HomePageImg from "@/../public/HomePage/HomePageImg.svg";

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

  const bgImage = newCollection[0]?.newproductPhoto;
  return (
    <div
      className="bg-no-repeat bg-cover h-screen flex justify-end items-center"
      style={{
        background: `url("${bgImage}") no-repeat center center/cover`,
      }}
    >
      <div className="w-full md:w-[90%] lg:w-[60%] xl:w-[50%] shadow-2xl bg-white bg-opacity-40 rounded-[16px] px-6 py-8 mx-5">
        <h2 className="ml-0 md:ml-11 mt-4 font-bold text-[32px] sm:text-[42px] lg:text-[52px] text-[#B88E2F]">
          {newCollection[0]?.title ?? ""}
        </h2>
        <p className="ml-0 md:ml-11 text-black mt-6 sm:mt-9 text-base sm:text-lg font-medium text-wrap max-w-full sm:max-w-lg">
          {newCollection[0]?.description ?? ""}
        </p>
        <div className="ml-0 md:ml-11 pb-6 sm:pb-10 pt-6 sm:pt-9">
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
