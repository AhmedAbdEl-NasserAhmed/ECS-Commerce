"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

function HomePageCategory() {
  const { locale } = useParams();

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="text-6xl font-semibold uppercase text-heading-color1 pb-4">
          Best Sale Category
        </h1>

        <p className="font-normal	text-paragraph-color1 text-[1.6rem]">
          Have a Tour in our amaizng JEANS offers
        </p>
      </div>

      <div className=" w-full h-[50vh]">
        <Link
          className="bg-[url(https://images.pexels.com/photos/16390580/pexels-photo-16390580/free-photo-of-jeans-on-hangers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] bg-cover bg-center w-full h-full block bg-no-repeat   "
          href={`/${locale}/user/productsList/6696d2e5498de05bd22375b9`}
        ></Link>
      </div>
    </>
  );
}

export default HomePageCategory;
