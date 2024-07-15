"use client";

import { useEffect, useState } from "react";
import { slides } from "@/constants/slides";
import Image from "next/image";
import Link from "next/link";

function Slider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[calc(100vh-90px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {slides.map((slide) => {
          return (
            <div
              className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
              key={slide.id}
            >
              <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
                <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                  {slide.description}
                </h2>
                <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                  {slide.title}
                </h1>
                <Link href={slide.url}>
                  <button className="rounded-md bg-black text-white py-3 px-4">
                    Shop Now
                  </button>
                </Link>
              </div>

              <div className="relative h-1/2 xl:w-1/2 xl:h-full">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  sizes="100%"
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
      <ul className="absolute left-1/2 m-auto bottom-8 flex gap-4">
        {slides.map((slide, index) => (
          <li
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex justify-center items-center ${
              currentSlide === index ? "scale-150" : ""
            } `}
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
          >
            {currentSlide === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Slider;
