import LandingContainer from "@/components/Views/Landing/LandingContainer";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { IRange } from "@/Utils/db";

const TheRange: React.FC = async () => {
  const { data } = await axios.get(
    "http://localhost:9089/guest/homeBrowseRange"
  );
  return (
    <section>
      <LandingContainer>
        <div className="flex flex-col justify-center items-center w-full min-h-screen p-4">
          <div className="flex justify-center items-center mx-auto mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#3A3A3A]">
             Seçilmiş məhsullar
            </h1>
          </div>
          <div className="text-center mb-4">
            <p className="w-full max-w-xl">
            "Keyfiyyət və unikallıq bir arada – sizin üçün xüsusi seçilmişdir!"
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-9">
            {data.map(({ _id, browseRangePhoto, description }: IRange) => {
              return (
                <div
                  key={_id}
                  className="flex flex-col justify-center items-center w-full h-auto"
                >
                  <Image
                    src={browseRangePhoto}
                    alt="image"
                    width={380}
                    height={480}
                    className="w-full h-auto object-cover"
                  />
                  <p className="mt-4 font-semibold text-lg text-center">
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </LandingContainer>
    </section>
  );
};

export default TheRange;
