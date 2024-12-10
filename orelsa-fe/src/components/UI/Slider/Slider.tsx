"use client";

import { cn } from "@nextui-org/theme";
import Image from "next/image";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const Rooms = [
  {
    id: 1,
    title: "Living Room",
    img: "/rooms/R-1.svg",
  },
  {
    id: 2,
    title: "Bedroom",
    img: "/rooms/R-2.svg",
  },
  {
    id: 3,
    title: "Kitchen",
    img: "/rooms/R-3.svg",
  },
  {
    id: 4,
    title: "Living Room",
    img: "/rooms/R-1.svg",
  },
  {
    id: 5,
    title: "Bedroom",
    img: "/rooms/R-2.svg",
  },
  {
    id: 6,
    title: "Kitchen",
    img: "/rooms/R-3.svg",
  },
  {
    id: 7,
    title: "Living Room",
    img: "/rooms/R-1.svg",
  },
  {
    id: 8,
    title: "Bedroom",
    img: "/rooms/R-2.svg",
  },
  {
    id: 9,
    title: "Kitchen",
    img: "/rooms/R-3.svg",
  },
  {
    id: 10,
    title: "Living Room",
    img: "/rooms/R-1.svg",
  },
  {
    id: 11,
    title: "Bedroom",
    img: "/rooms/R-2.svg",
  },
  {
    id: 12,
    title: "Kitchen",
    img: "/rooms/R-3.svg",
  },
];
export default function Slider() {
  const nextButtonRef = useRef<any>(null);
  const paginationRef = useRef<any>(null);
  const [init, setInit] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="h-full w-full relative customSwiper">
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        className="h-full"
        modules={[Navigation, Pagination]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onInit={(swiper) => {
          setActiveIndex(swiper.realIndex);
          setInit(true);
        }}
        navigation={{
          nextEl: nextButtonRef.current,
        }}
        pagination={{
          clickable: true,
          el: paginationRef.current,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            navigation: {
              enabled: false,
            },
            pagination: {
              enabled: true,
            },
          },
          768: {
            slidesPerView: 2,
            navigation: {
              enabled: false,
            },
            pagination: {
              enabled: true,
            },
          },
          1024: {
            slidesPerView: 3,
            navigation: {
              enabled: true,
            },
            pagination: {
              enabled: true,
            },
          },
        }}
      >
        {Rooms.map((room, index) => (
          <SwiperSlide
            className={cn(
              "w-full h-full transition-all duration-700",
              index === activeIndex ? "lg:!h-full" : "lg:!h-[464px]"
            )}
            key={room.id}
          >
            <Image
              width={305}
              height={405}
              src={room.img}
              alt={room.title}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
        <div
          ref={paginationRef}
          className="absolute !hidden lg:!flex items-center gap-2 bottom-0 left-1/2 w-full"
        >
          <div className="swiper-pagination">
            {Rooms.map((room, index) => (
              <span
                key={room.id}
                className={cn(
                  "swiper-pagination-bullet",
                  index === activeIndex && "swiper-pagination-bullet-active"
                )}
              ></span>
            ))}
          </div>
        </div>
      </Swiper>
    </div>
  );
}
