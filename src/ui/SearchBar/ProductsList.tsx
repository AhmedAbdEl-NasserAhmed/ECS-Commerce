import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Spinner from "../Spinner/Spinner";

function ProductsList({ data, setProductName, productName }) {
  const { locale } = useParams();

  const [showList, setShowList] = useState<boolean>(true);

  const userTranslation = useTranslations("user");

  const ref = useRef(null);

  function handleObserver(entries) {
    const firstEntry = entries[0];

    if (!firstEntry.isIntersecting) {
      setShowList(false);
      setProductName("");
    } else {
      setShowList(true);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    });

    if (observer && ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) return <Spinner />;

  return (
    <ul
      ref={ref}
      className={`absolute top-16 w-full left-0 bg-white shadow-xl overflow-y-scroll transition-all duration-300 flex flex-col gap-5 z-50 ${
        productName && showList ? "h-96" : "h-0"
      } `}
    >
      {data?.length === 0 && (
        <p className="font-semibold text-xl flex items-center justify-center h-full">
          {userTranslation("No Products Available")}
        </p>
      )}

      {data?.map((product) => {
        return (
          <li
            className="p-6 text-black  hover:bg-gray-100 duration-300 transition-all"
            key={product["_id"]}
          >
            <Link href={`/${locale}/user/product/${product?.slug}`}>
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-5">
                  <div className="relative">
                    <Image
                      className="rounded-md"
                      width={60}
                      height={60}
                      src={product?.images[0]?.url || ""}
                      alt="iamge"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-semibold">
                      {product.name?.[locale as string]}
                    </h2>
                    <h2 className="font-semibold">{product.size.value}</h2>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <h2 className="font-semibold">
                      {product.price} {userTranslation("EGP")}
                    </h2>
                  </div>
                  <ul className="flex items-center justify-center gap-2">
                    {product.colors.map((color) => {
                      return (
                        <li
                          className="w-4 h-4 rounded-full block"
                          key={product["_id"]}
                          style={{ backgroundColor: color.value }}
                        ></li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default ProductsList;
