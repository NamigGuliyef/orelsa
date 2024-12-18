import { getDetailsById, getRelatedProductsById } from "@/api/ui/requests";
import ProductsDetails from "@/components/UI/Details/ProductsDetails";
import RelatedProducts from "@/components/UI/Releated/Products";
import LandingContainer from "@/components/Views/Landing/LandingContainer";
import { IProduct } from "@/interface/ui";
import { isEmpty } from "lodash-es";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  params: {
    id: string;
  };
}

export default async function ShopDetails({ params }: IProps) {
  const data = await getDetailsById(params.id);
  const related: IProduct[] = await getRelatedProductsById(params.id);

  return (
    <main>
      <section className="bg-[#F9F1E7] ">
        <LandingContainer>
          <div className="flex md:justify-between justify-center items-center gap-6  w-full relative">
            <div className="flex justify-between items-center gap-0 md:gap-6 ">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Link href="/" className="text-sm sm:text-base">
                    Ana səhifə
                  </Link>
                  <span className="font-bold">&gt;</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link href="/shop" className="text-sm sm:text-base">
                    Mağaza
                  </Link>
                  <span className="font-bold">&gt; </span>
                </div>
              </div>

              <div className="flex justify-between items-center gap-10 py-10">
                <p> {data.name}</p>
              </div>
            </div>
          </div>
        </LandingContainer>
      </section>
      <ProductsDetails {...data} />
      {isEmpty(related) ? null : <RelatedProducts relatedProducts={related} />}
    </main>
  );
}
