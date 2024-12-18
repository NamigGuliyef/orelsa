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
}: IProductById & { discount_price?: number; discount?: number }) => {
  const [selectedImage, setSelectedImage] = useState(photos?.[0] ?? "");

  const handleImageOnClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  return (
    <section className="bg-white py-4 sm:py-10">
      <LandingContainer>
        <div className="flex flex-wrap items-start gap-2">
          {/* Sol Bölmə: Şəkil Thumbnail-lər */}
          <div className="flex gap-3 flex-row md:flex-col">
            {photos?.map((src: string, index: number) => (
              <Image
                key={index}
                src={src}
                alt="thumbnail"
                width={76}
                height={80}
                className={`bg-cover bg-no-repeat cursor-pointer rounded-md ${
                  selectedImage === src ? "ring-2 ring-green-500" : ""
                }`}
                onClick={() => handleImageOnClick(src)}
              />
            ))}
          </div>

          {/* Əsas Şəkil */}
          <div id="main-photo" className="relative flex justify-center w-full sm:w-auto">
            <Image
              src={selectedImage}
              alt="main"
              width={480}
              height={480}
              className="bg-cover bg-no-repeat rounded-md w-full sm:w-[480px] sm:h-[500px] h-auto max-w-[480px]"
            />
            {/* Endirim Faizi */}
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 text-lg font-bold rounded-full shadow-lg">
                -{discount}%
              </div>
            )}
          </div>

          {/* Sağ Bölmə */}
          <div
            id="second-part"
            className="flex flex-col sm:items-start items-center w-full sm:w-auto"
          >
            {/* Məhsul Adı */}
            <div className="text-center sm:text-left">
              <h2 className="font-semibold text-4xl sm:text-5xl text-gray-1000 mb-4">{name}</h2>
            </div>

            {/* Qiymətlər */}
            {discount > 0 ? (
              <div className="flex items-center gap-4 mt-2">
                <p className="text-3xl text-red-500 font-bold">{discount_price} AZN</p>
                <p className="text-2xl text-gray-400 line-through">{price} AZN</p>
              </div>
            ) : (
              <p className="text-3xl text-red-500 font-bold">{price} AZN</p>
            )}

            {/* Məhsul Təsviri */}
            <p className="text-gray-500 text-base mt-4 text-center sm:text-left">{description}</p>

            {/* Sifariş Et Button */}
            <div className="flex justify-center sm:justify-start pt-6">
              <Button
                className="w-56 h-[75px] bg-green-500 font-bold text-white text-lg transform hover:translate-x-2"
                onClick={() => {
                  window.open("https://wa.me/+994559706747", "_blank");
                }}
              >
                SİFARİŞ ET
              </Button>
            </div>

            {/* Model və Kateqoriya */}
            <div className="flex flex-col gap-2 mt-6">
              <div className="flex gap-2 text-gray-500 text-sm">
                <p>Model:</p>
                <span className="text-gray-800">{model_no}</span>
              </div>
              <div className="flex gap-2 text-gray-500 text-sm">
                <p>Kateqoriya:</p>
                <span className="text-gray-800">{category}</span>
              </div>
            </div>

            {/* Sosial Şəbəkələr */}
            <div className="flex items-center gap-6 mt-10">
              <h6 className="text-gray-500 text-sm">Bizi izləyin:</h6>
              <div className="flex gap-4 text-xl">
                <Link href="https://facebook.com" target="_blank">
                  <FaFacebook className="text-blue-600" />
                </Link>
                <Link href="https://instagram.com" target="_blank">
                  <AiOutlineInstagram className="text-red-400" />
                </Link>
                <Link href="https://tiktok.com" target="_blank">
                  <AiOutlineTikTok className="text-blue-800" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
};

export default ProductsDetails;
