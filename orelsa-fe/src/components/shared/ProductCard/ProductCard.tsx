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
      className="relative flex flex-col items-center bg-[#F9F1E7] border rounded-[20px] w-full max-w-[300px] h-auto p-4 shadow-lg hover:shadow-2xl transition duration-300 group"
    >
      {/* Yeni Ürək İkonu */}
      <div className="absolute top-4 right-4 bg-white w-8 h-8 flex items-center justify-center rounded-full shadow-md">
        <span className="text-[#E97171] text-lg font-bold">❤</span>
      </div>

      {/* Məhsul Şəkli */}
      <div className="relative w-full h-40 mb-4 overflow-hidden rounded-lg">
        <Image
          src={photos?.[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          width={300}
          height={160}
        />
        {/* "NEW" və ya Endirim Faizi */}
        {discount > 0 ? (
          <div className="absolute top-2 left-2 bg-[#E97171] text-white text-xs px-2 py-1 rounded-full">
            -{discount}%
          </div>
        ) : (
          <div className="absolute top-2 left-2 bg-[#2EC1AC] text-white text-xs px-2 py-1 rounded-full">
            NEW
          </div>
        )}
      </div>

      {/* Məhsul Adı */}
      <h2 className="text-lg font-bold text-[#3A3A3A] mb-2">{name}</h2>

      {/* Məhsul Açıqlaması */}
      <p className="text-sm text-[#898989] text-center mb-2">{description}</p>

      {/* Qiymət Sahəsi */}
      <div className="flex justify-between items-center w-full">
        <p className="text-lg font-semibold text-[#E97171]">{discount_price || price} AZN</p>
        {discount > 0 && (
          <p className="text-sm text-gray-400 line-through">{price} AZN</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
