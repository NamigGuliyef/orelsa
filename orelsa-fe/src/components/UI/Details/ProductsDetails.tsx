"use client";

import LandingContainer from "@/components/Views/Landing/LandingContainer";
import { IProductById } from "@/interface/ui";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";

const ProductsDetails = ({
  _id,
  name,
  description,
  price,
  photos,
  category,
  model_no,
}: IProductById) => {
  const [selectedImage, setSelectedImage] = useState(photos?.[0] ?? "");

  const handleImageOnClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  return (
    <section>
      <LandingContainer>
        <div className="py-10 w-full flex flex-wrap items-start gap-10">
          <div className="flex gap-3 flex-row md:flex-col">
            {photos?.map((src: string, index: number) => {
              return (
                <Image
                  key={index}
                  src={src}
                  alt="image"
                  width={76}
                  height={80}
                  className="bg-cover bg-no-repeat cursor-pointer"
                  onClick={() => handleImageOnClick(src)}
                />
              );
            })}
          </div>
          <div id="main-photo" className="flex justify-center w-full sm:w-auto">
            <Image
              src={selectedImage}
              alt="main"
              width={480}
              height={500}
              className="bg-cover bg-no-repeat border-none w-full sm:w-[480px] sm:h-[500px] h-auto max-w-[480px]"
            />
          </div>
          <div
            id="second-part"
            className="flex flex-col sm:items-start items-center w-full sm:w-auto"
          >
            <div className="py-4 bg-red text-center sm:text-center">
              <h2 className="font-normal text-4xl py-2">{name}</h2>
              <p className="font-medium text-2xl text-[#9F9F9F] pb-5">
                {price + " AZN"}
              </p>
              <p className="font-normal text-sm sm:w-[50ch] w-[90%]">
                {description}
              </p>
            </div>

            <div className="flex pt-20 pb-40 justify-center sm:justify-start">
              <Button className="w-56 h-[75px] bg-[#B88E2F] font-bold text-white text-base">
                SİFARİŞ ET
              </Button>
            </div>
            <hr />
            <div className="flex flex-col w-full pt-10">
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
              <div className="flex">
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
            <div id="follow" className="flex gap-6 pt-14">
              <h6 className="font-normal text-base text-[#9F9F9F]">
                Follow us
              </h6>
              <span className="font-normal text-base text-[#9F9F9F]">:</span>
              <div className="flex justify-between items-center gap-4">
                <Link href="https://facebook.com">
                  <FaFacebook />
                </Link>
                <Link href="https://linkedin.com">
                  <FaLinkedinIn />
                </Link>
                <Link href="https://x.com">
                  <AiFillTwitterCircle />
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
