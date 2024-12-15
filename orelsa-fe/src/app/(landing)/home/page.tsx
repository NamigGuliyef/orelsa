"use client";
import HomePageImg from "@/../public/HomePage/HomePageImg.svg";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://orelsa.vercel.app/guest/homeNewCollection"
        );
        setData(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Məlumat yüklənir...</div>;
  }

  if (!data || data.length === 0) {
    return <div>Məlumat tapılmadı.</div>;
  }

  const backgroundImage = data[0]?.newproductPhoto
    ? `url(${data[0].newproductPhoto})`
    : `url(${HomePageImg.src})`;

  return (
    <main
      className="bg-no-repeat bg-cover h-screen flex justify-end items-center"
      style={{ backgroundImage: backgroundImage }}
    >
      <div className="w-full md:w-[90%] lg:w-[60%] xl:w-[50%] shadow-2xl bg-white bg-opacity-40 rounded-[16px] px-6 py-8 mx-5">
        <h2 className="ml-0 md:ml-11 mt-4 font-bold text-[32px] sm:text-[42px] lg:text-[52px] text-[#B88E2F]">
          {data[0]?.title ?? "Yeni kolleksiya"}
        </h2>
        <p className="ml-0 md:ml-11 text-black mt-6 sm:mt-9 text-base sm:text-lg font-medium text-wrap max-w-full sm:max-w-lg">
          {data[0]?.description ?? "Saç gücləndirici"}
        </p>
        <div className="ml-0 md:ml-11 pb-6 sm:pb-10 pt-6 sm:pt-9">
          <Button className="w-56 h-[75px] bg-[#B88E2F] font-bold text-white text-base transform hover:translate-x-2"
            onClick={() => {
              window.open("https://wa.me/+994559706747", "_blank");
            }}
          >
            SİFARİŞ ET
          </Button>
        </div>
      </div>
    </main>
  );
}
