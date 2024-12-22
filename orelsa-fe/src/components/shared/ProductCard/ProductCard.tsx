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
  const truncatedDescription =
    description?.length > 50
      ? description.substring(0, 50) + "..."
      : description;

  return (
    <div
      key={_id}
      className="relative flex flex-col items-center bg-[#F9F1E7] border rounded-[15px] w-full max-w-[250px] h-auto p-3 shadow-md hover:shadow-lg transition-all duration-500 group hover:scale-[1.05] transform-gpu"
    >
      {/* Məhsul Şəkili */}
      <div className="relative w-full h-36 mb-3 overflow-hidden rounded-md group-hover:shadow-lg transition-transform duration-500 ease-in-out">
        <Image
          src={photos?.[0]}
          alt={name}
          className="w-full h-full object-cover rounded-md group-hover:scale-105"
          width={250}
          height={144}
        />
        {/* NEW və ya ENDİRİM */}
        {discount > 0 ? (
          <div className="absolute top-2 left-2 bg-[#FF5252] text-white text-xs px-2 py-1 rounded-full shadow-md animate-bounce">
            -{discount}%
          </div>
        ) : (
          <div className="absolute top-2 left-2 bg-[#2EC1AC] text-white text-xs px-2 py-1 rounded-full shadow-md">
            YENİ
          </div>
        )}
      </div>

      {/* Məhsul Adı */}
      <h2 className="text-sm font-bold text-[#3A3A3A] mb-2 group-hover:text-[#B88E2F] transition-all">
        {name}
      </h2>

      {/* Məhsul Açıqlaması */}
      <p className="text-xs text-[#898989] text-center mb-2">
        {truncatedDescription}
        {description?.length > 50 && (
          <Link href={`/products/${_id}`} className="text-[#B88E2F] ml-2">
            Ətraflı
          </Link>
        )}
      </p>

      {/* Qiymət Sahəsi */}
      <div className="flex justify-between items-center w-full">
        <p className="text-sm font-semibold text-[#E97171] group-hover:scale-105">
          {(discount_price || price).toFixed(2)} AZN
        </p>
        {discount > 0 && (
          <p className="text-xs text-gray-400 line-through">
            {price.toFixed(2)} AZN
          </p>
        )}
      </div>

      {/* Arxa Tərəf (Hover ilə Daha Çox Məlumat) */}
      <div className="absolute inset-0 bg-white/90 rounded-[15px] p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center">
        <h3 className="text-sm font-bold mb-2 text-[#B88E2F]">Ətraflı Baxış</h3>
        <p className="text-xs text-[#3A3A3A] text-center">
          {description}
        </p>
        <Link
          href={`/products/${_id}`}
          className="mt-3 px-4 py-1 bg-[#B88E2F] text-white text-xs rounded-full shadow-md hover:bg-[#A07826] transition-all"
        >
          Məhsula Get
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
