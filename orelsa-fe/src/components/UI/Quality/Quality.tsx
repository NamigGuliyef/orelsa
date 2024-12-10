import LandingContainer from "@/components/Views/Landing/LandingContainer";
import Image from "next/image";
import { AboutQuality, QualityData } from "@/Utils/db";

const Quality = () => {
  return (
    <section className="bg-[#FAF3EA] my-24">
      <LandingContainer>
        <div className="py-28 flex justify-center items-center  w-full md:flex-col">
          <div className="w-full flex md:flex-row flex-col justify-around items-start ml-[60px] gap-[50px]">
            {QualityData.map(({ id, src, title, desc }: AboutQuality) => {
              return (
                <div
                  key={id}
                  className="flex justify-center items-center  gap-2"
                >
                  <div className="">
                    <Image src={src} alt="images" width={50} height={60} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-2xl pb-1">{title}</h4>
                    <p className="font-semibold text-xl text-[#898989]">
                      {desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </LandingContainer>
    </section>
  );
};

export default Quality;
