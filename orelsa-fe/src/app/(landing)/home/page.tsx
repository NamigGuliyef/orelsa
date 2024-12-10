import HomePageImg from "@/../public/HomePage/HomePageImg.svg";
import OurProducts from "@/components/UI/OurProducts/OurProducts";
import Rooms from "@/components/UI/Rooms/Rooms";
import TheRange from "@/components/UI/TheRange/TheRange";
import Footer from "@/components/Views/Landing/Footer";
import { Button } from "@nextui-org/react";
import axios from "axios";

export default async function HomePage() {
  const { data } = await axios.get(
    "http://localhost:9089/guest/homeNewCollection"
  );

  const backgroundImage = data[0]?.newproductPhoto
    ? `url(${data[0].newproductPhoto})`
    : `url(${HomePageImg.src})`;
  return (
    <>
      <main
        className="bg-no-repeat bg-cover h-screen flex justify-end items-center"
        style={{ backgroundImage: `${backgroundImage}` }}
      >
        <div className="w-full md:w-[90%] lg:w-[60%] xl:w-[50%] shadow-2xl bg-white bg-opacity-40 rounded-[16px] px-6 py-8 mx-5">
          <h2 className="ml-0 md:ml-11 mt-4 font-bold text-[32px] sm:text-[42px] lg:text-[52px] text-[#B88E2F]">
            {data[0]?.title ?? "Yeni kolleksiya"}
          </h2>
          <p className="ml-0 md:ml-11 text-black mt-6 sm:mt-9 text-base sm:text-lg font-medium text-wrap max-w-full sm:max-w-lg">
            {data[0]?.description ?? "Saç gücləndirici"}
          </p>
          <div className="ml-0 md:ml-11 pb-6 sm:pb-10 pt-6 sm:pt-9">
            <Button className="gap-3 bg-[#B88E2F] w-full sm:w-[222px] h-[60px] sm:h-[75px] font-bold text-base text-white">
              İndi sifariş et
            </Button>
          </div>
        </div>
      </main>
      <TheRange />
      <OurProducts />
      <Rooms />
      <Footer />
    </>
  );
}
