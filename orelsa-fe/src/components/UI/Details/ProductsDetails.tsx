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
        </div>

        {/* Sağ Bölmə */}
        <div className="flex flex-col gap-4 sm:items-start items-center w-full sm:w-auto p-20">
          {/* Məhsul Adı */}
          <div className="text-left">
            <h2 className="text-5xl font-semibold text-gray-1000">{name}</h2>
          </div>

{/* Qiymətlər */}  
{discount > 0 ? (
  <div className="flex items-center gap-4 mt-2">
    <p className="text-3xl text-red-500 font-bold">
      {discount_price} AZN
    </p>
    <p className="text-2xl text-gray-400 line-through">
      {price} AZN
    </p>
  </div>
) : (
  <p className="text-3xl text-red-500 font-bold">
    {price} AZN
  </p>
)}


          {/* Description */}
          <p className="text-gray-500 text-base">{description}</p>

          {/* Sifariş Et Button */}
          <Link href="https://wa.me/+994559706747" passHref>
            <Button className="w-44 h-12 bg-green-500 font-bold text-white text-lg mt-6">
              SİFARİŞ ET
            </Button>
          </Link>

          {/* Model və Kateqoriya */}
          <div className="flex flex-col gap-2 mt-6">
            <div className="flex gap-2 text-gray-500 text-sm">
              <p>Model:</p>
              <span className="text-gray-800">{model_no}</span>
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
