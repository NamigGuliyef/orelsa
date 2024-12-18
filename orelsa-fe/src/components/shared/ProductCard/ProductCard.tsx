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
      {/* Yeni Ürək İkonu
      <div className="absolute top-4 right-4 bg-white w-8 h-8 flex items-center justify-center rounded-full shadow-md">
        <span className="text-[#E97171] text-lg font-bold">❤</span>
      </div> */}

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
        {/* Ətraflı Bax Göz Şəkili */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link
            href={`/products/${_id}`}
            className="w-12 h-12 bg-white flex items-center justify-center rounded-full shadow-lg text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-6 h-6"
            >
              <path d="M8 3.5a5 5 0 0 1 4.546 2.916.5.5 0 0 1 0 .418A5 5 0 0 1 8 12.5a5 5 0 0 1-4.546-2.916.5.5 0 0 1 0-.418A5 5 0 0 1 8 3.5ZM8 2a6 6 0 0 0-5.472 3.466 1.5 1.5 0 0 0 0 1.068A6 6 0 0 0 8 14a6 6 0 0 0 5.472-3.466 1.5 1.5 0 0 0 0-1.068A6 6 0 0 0 8 2Zm0 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Məhsul Adı */}
      <h2 className="text-lg font-bold text-[#3A3A3A] mb-2">{name}</h2>

      {/* Məhsul Açıqlaması */}
      <p className="text-sm text-[#898989] text-center mb-2">{description}</p>

      {/* Qiymət Sahəsi */}
      <div className="flex justify-between items-center w-full">
        <p className="text-lg font-semibold text-[#E97171]"> {((discount_price || price).toFixed(2))} AZN</p>
        {discount > 0 && (
          <p className="text-sm text-gray-400 line-through"> {price.toFixed(2)} AZN</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
