"use client";

import LandingContainer from "@/components/Views/Landing/LandingContainer";
import { IProductById } from "@/interface/ui";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineTikTok } from "react-icons/ai";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";

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
    <section className="bg-white py-10">
      <LandingContainer>
        <div className="flex flex-wrap items-start gap-6">
          {/* Sol Thumbnail Bölməsi */}
          <div className="flex flex-col gap-3">
            {photos?.map((src: string, index: number) => (
              <Image
                key={index}
                src={src}
                alt="thumbnail"
                width={76}
                height={80}
                className={`cursor-pointer rounded-md border-2 ${
                  selectedImage === src ? "border-green-500" : "border-gray-300"
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
              width={450}
              height={450}
              className="bg-cover bg-no-repeat rounded-md"
            />
            {/* Endirim Faizi */}
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 text-lg font-bold rounded-full shadow-lg">
                -{discount}%
              </div>
            )}
          </div>

          {/* Məhsul Məlumatları */}
          <div id="second-part" className="flex flex-col sm:items-start items-center w-full sm:w-auto">
            <div className="text-left">
              <h2 className="text-4xl font-semibold text-green-500">{name}</h2>
              <p className="text-lg text-gray-500 mt-6">{description}</p>

              {discount > 0 ? (
                <div className="flex items-center gap-4 mt-4">
                  <p className="text-3xl text-red-500 font-bold">{discount_price} AZN</p>
                  <p className="text-2xl text-gray-400 line-through">{price} AZN</p>
                </div>
              ) : (
                <p className="text-3xl text-red-500 font-bold mt-4">{price} AZN</p>
              )}
            </div>

            {/* Sifariş Et Button */}
            <div className="flex justify-center pt-10 pb-10">
              <Button
                className="w-56 h-[75px] bg-green-500 font-bold text-white text-base transform hover:translate-x-2"
                onClick={() => {
                  window.open("https://wa.me/+994559706747", "_blank");
                }}
              >
                SİFARİŞ ET
              </Button>
            </div>

            {/* Model və Kateqoriya */}
            <div className="flex flex-col w-full items-center sm:items-start text-center">
              <div className="flex gap-3">
                <p className="font-normal text-base text-gray-500">Model</p>
                <span className="font-normal text-base text-gray-500">:</span>
                <p className="font-normal text-base text-gray-800">{model_no}</p>
              </div>
              <div className="flex gap-3 mt-2">
                <p className="font-normal text-base text-gray-500">Category</p>
                <span className="font-normal text-base text-gray-500">:</span>
                <p className="font-normal text-base text-gray-800">{category}</p>
              </div>
            </div>

            {/* Sosial Şəbəkələr */}
            <div id="follow" className="flex gap-6 pt-14">
              <h6 className="font-normal text-base text-gray-500">Follow us</h6>
              <span className="font-normal text-base text-gray-500">:</span>
              <div className="flex gap-4">
                <Link href="https://facebook.com">
                  <FaFacebook className="text-blue-600" />
                </Link>
                <Link href="https://linkedin.com">
                  <FaLinkedinIn className="text-blue-700" />
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
