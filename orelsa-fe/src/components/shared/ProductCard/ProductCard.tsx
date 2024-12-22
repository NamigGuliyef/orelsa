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
      className="relative flex flex-col items-center bg-[#F9F1E7] border rounded-[20px] w-full max-w-[300px] h-[380px] p-4 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:scale-[1.1] transform-gpu hover:rotate-1 hover:translate-y-[-5px]"
    >
      {/* Məhsul Şəkili */}
      <div className="relative w-full h-40 md:h-60 mb-4 overflow-hidden rounded-lg group-hover:shadow-2xl transition-transform duration-500 ease-in-out">
        <Image
          src={photos?.[0]}
          alt={name}
          className="w-full h-full object-cover rounded-lg group-hover:scale-110 group-hover:rotate-2"
          width={300}
          height={160}
        />
        {/* NEW və ya ENDİRİM */}
        {discount > 0 ? (
          <div className="absolute top-2 left-2 bg-[#FF5252] text-white text-xs px-3 py-1 rounded-full shadow-lg animate-bounce">
            -{discount}%
          </div>
        ) : (
          <div className="absolute top-2 left-2 bg-[#2EC1AC] text-white text-xs px-3 py-1 rounded-full shadow-lg">
            NEW
          </div>
        )}
      </div>

      {/* Məhsul Adı */}
      <h2 className="text-lg font-bold text-[#3A3A3A] mb-2 group-hover:text-[#B88E2F] transition-all">
        {name}
      </h2>

      {/* Məhsul Açıqlaması */}
      <p className="text-sm text-[#898989] text-center mb-2">
        {truncatedDescription}
        {description?.length > 50 && (
          <Link href={`/products/${_id}`} className="text-[#B88E2F] ml-2">
            Ətraflı
          </Link>
        )}
      </p>

      {/* Qiymət Sahəsi */}
      <div className="flex justify-between items-center w-full">
        <p className="text-lg font-semibold text-[#E97171] group-hover:scale-110">
          {(discount_price || price).toFixed(2)} AZN
        </p>
        {discount > 0 && (
          <p className="text-sm text-gray-400 line-through">
            {price.toFixed(2)} AZN
          </p>
        )}
      </div>

      {/* Arxa Tərəf (Hover ilə Daha Çox Məlumat) */}
      <div className="absolute inset-0 bg-white/80 rounded-[20px] p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center">
        <h3 className="text-lg font-bold mb-4 text-[#B88E2F]">Ətraflı Baxış</h3>
        <p className="text-sm text-[#3A3A3A] text-center">
          {description}
        </p>
        <Link
          href={`/products/${_id}`}
          className="mt-4 px-6 py-2 bg-[#B88E2F] text-white rounded-full shadow-md hover:bg-[#A07826] transition-all"
        >
          Məhsula Get
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
