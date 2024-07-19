"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

function HomePageCategory() {
  const { locale } = useParams();

  return (
    <>
      <div className=" text-center mb-10">
        <h1 className="text-6xl font-semibold uppercase text-heading-color1 pb-4">
          Best Sale Category
        </h1>

        <p className="font-normal	text-paragraph-color1 text-[1.6rem]">
          Have a Tour in our amaizng JEANS offers
        </p>
      </div>

      <div className=" w-full h-[50vh] relative group overflow-hidden">
        <div className="bg-[url(https://images.pexels.com/photos/16390580/pexels-photo-16390580/free-photo-of-jeans-on-hangers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] bg-cover bg-center w-full h-full block bg-no-repeat">
          <span className="absolute -left-[100vw]  w-full h-full flex justify-center items-center  group-hover:left-0 transition-all duration-700 ">
            <span className="bg-black opacity-50 w-full h-full "></span>
          </span>
        </div>
        <Link
          style={{ transform: "translate(-50%)" }}
          className="text-3xl bg-white text-black p-6 absolute rounded-md left-[50%] -bottom-[50%] group-hover:bottom-[50%] transition-all duration-1000 "
          href={`/${locale}/user/productsList/6696d2e5498de05bd22375b9`}
        >
          Start Shopping
        </Link>
      </div>
    </>
  );
}

export default HomePageCategory;
