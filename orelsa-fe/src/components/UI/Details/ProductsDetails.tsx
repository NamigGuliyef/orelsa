"use client";

import LandingContainer from "@/components/Views/Landing/LandingContainer";
import { IProductById } from "@/interface/ui";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineInstagram, AiOutlineTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

const ProductsDetails = ({
  _id,
  name,
  description,
  price,
  discount_price,
  photos,
  category,
  model_no,
  discount,
}: IProductById & { discount_price: number; discount: number }) => {
  const [selectedImage, setSelectedImage] = useState(photos?.[0] ?? "");

  const handleImageOnClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  return (
    <section className="bg-white py-0">
      <LandingContainer>
        {/* Sol Bölmə */}
        <div className="flex gap-0 relative">
          <div className="flex flex-col gap-2">
            {photos?.map((src: string, index: number) => (
              <Image
                key={index}
                src={src}
                alt="thumbnail"
                width={100}
                height={100}
                className={`cursor-pointer rounded-md ${
                  selectedImage === src ? "ring-2 ring-green-500" : ""
                }`}
                onClick={() => handleImageOnClick(src)}
              />
            ))}
          </div>

          <div id="main-photo" className="relative flex justify-center w-full">
            <Image
              src={selectedImage}
              alt="main"
              width={500}
              height={500}
              className="bg-cover bg-no-repeat rounded-md"
            />
            {/* Endirim Faizi yalnız əsas şəkilin üzərində */}
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 text-lg font-bold rounded-full shadow-lg">
                -{discount}%
              </div>
            )}
          </div>
          <div
            id="second-part"
            className="flex flex-col sm:items-start items-center w-full sm:w-auto"
          >
            <div className=" bg-red text-center sm:text-center ">
              <h2 className="font-normal text-4xl text-green-500">
                {name}
              </h2>
              <p className="font-normal text-lg sm:w-[18ch] w-[90%] mt-6">
                {description}
              </p>
              <p className="font-medium text-2xl text-red-500 my-6">
                {price + " AZN"}
              </p>
            </div>

            <div className="flex justify-center py-10">
              <Button
                className="w-56 h-[75px] bg-[#B88E2F] font-bold text-white text-base transform hover:translate-x-2"
                onClick={() => {
                  window.open("https://wa.me/+994559706747", "_blank");
                }}
              >
                SİFARİŞ ET
              </Button>
            </div>

            <hr />
            <div className="flex flex-col w-full  items-center md:items-start text-center">
              <div className="flex gap-3">
                <p className="pr-10 font-normal text-base text-[#9F9F9F]">
                  Model
                </p>
                <span className="pr-2 font-normal text-base text-[#9F9F9F]">
                  :
                </span>
                <p className="font-normal text-base text-[#9F9F9F]">
                  {model_no}
                </p>
              </div>
              <div className="flex items-center text-left">
                <p className="pr-7 font-normal text-base text-[#9F9F9F]">
                  Category
                </p>
                <span className="pr-4 font-normal text-base text-[#9F9F9F]">
                  :
                </span>
                <p className="font-normal text-base text-[#9F9F9F]">
                  {category}
                </p>
              </div>
            </div>
            <div className="flex gap-2 text-gray-500 text-sm">
              <p>Category:</p>
              <span className="text-gray-800">{category}</span>
            </div>
          </div>

          {/* Sosial Şəbəkələr */}
          <div className="flex items-center gap-3 mt-10">
            <h6 className="text-gray-500 text-sm">Follow us:</h6>
            <div className="flex gap-4 text-xl">
              <Link href="https://facebook.com" target="_blank">
                <FaFacebook className="text-blue-600" />
              </Link>
              <Link href="https://tiktok.com" target="_blank">
                <AiOutlineTikTok className="text-blue-800" />
              </Link>
              <Link href="https://instagram.com" target="_blank">
                <AiOutlineInstagram className="text-red-400" />
              </Link>
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
};

export default ProductsDetails;
