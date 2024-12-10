import { ProductDetail } from "@/Utils/db";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({
  _id,
  name,
  description,
  price,
  discount,
  discount_price,
  photos,
}: ProductDetail) => {
  return (
    <div
      key={_id}
      className="relative flex flex-col justify-center items-center border rounded-lg w-full h-auto mb-6 group hover:shadow-xl "
    >
      <div className="absolute flex justify-center items-center opacity-0 inset-0 z-50 transition duration-300 ease-in-out group-hover:bg-black/70 group-hover:opacity-100">
        <Link
          href={`/products/${_id}`}
          className="bg-white w-[60%] text-xl text-[#B88E2F] py-3 rounded duration-300 ease-in-out text-center"
        >
          Ətraflı bax
        </Link>
      </div>

      <div className="relative w-full h-full overflow-hidden rounded">
        <Image
          src={photos?.[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
          width={300}
          height={300}
        />
      </div>

      <div className="bg-[#F4F5F7] w-full h-max pb-4 pl-4 pr-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">{name}</h2>
        <p className="text-sm sm:text-base text-[#B0B0B0]">{description}</p>
        <div className="flex flex-col justify-between w-full gap-2 mt-2">
          <p className="text-lg sm:text-xl font-semibold text-[#B0B0B0]">
            {discount_price} AZN
          </p>

          {discount !== 0 ? (
            <p className="text-lg sm:text-xl font-bold text-[#B0B0B0] line-through mb-2">
              {price} <span>AZN</span>
            </p>
          ) : (
            <div className="h-[35px]"></div>
          )}

          <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-[#E97171] text-white absolute top-[24px] right-4 sm:w-[50px] sm:h-[50px] sm:right-6">
            {discount > 0 ? (
              <p className="text-sm sm:text-base">{discount}%</p>
            ) : (
              <div className="flex justify-center items-center w-full h-full bg-[#2EC1AC] rounded-full">
                <p className="text-sm sm:text-base">New</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
