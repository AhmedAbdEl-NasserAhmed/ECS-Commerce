import Image from "next/image";
import ProductListOptions from "../ProductsList/ProductListOptions";
import { useGetCategoryByIdQuery } from "@/lib/features/api/categoriesApi";
import Spinner from "../Spinner/Spinner";
import ColorItem from "../ColorItem/ColorItem";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetSingleProductBySlugQuery } from "@/lib/features/api/productsApi";
import { formatCurrency } from "@/lib/helpers";

const ProductCard = ({ product }) => {
  const { data: category } = useGetCategoryByIdQuery(product?.category, {
    skip: !product?.category,
  });

  const { locale } = useParams();

  const userTranslation = useTranslations("user");

  const { data: productsBySlug, isLoading } = useGetSingleProductBySlugQuery(
    product.slug
  );

  if (!product) return <Spinner />;

  const _colors = productsBySlug?.data?.products?.reduce((acc, product) => {
    if (
      acc.some((color) => product?.colors.find((c) => c.value === color.value))
    )
      return acc;
    return acc.concat(
      product?.colors?.map((color) => {
        return color;
      })
    );
  }, []);

  const notAvailable = product?.quantity === 0;

  return (
    <div
      className=""
      style={{
        boxShadow: "0px 3px 15px 0px #0000000f",
      }}
    >
      <div className="relative w-full group overflow-hidden aspect-[2/3]">
        <div
          className={`${
            product.images[0] && product.images[1] ? "hover:opacity-0 " : ""
          } 
            relative easy transition-opacity duration-500 rounded-md absolute z-10 h-full w-full overflow-hidden`}
        >
          <Image
            src={product.images[0]?.url || ""}
            quality={75}
            alt={product.name?.[locale as string]}
            layout="responsive" // Responsive layout instead of fill
            width={942} // Set a base width for the image
            height={1177} // Set a corresponding height for the aspect ratio
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {product.images[1] && (
          <div className="absolute top-0 transition-all duration-500 rotate-0 scale-1 group-hover:rotate-3 group-hover:scale-110 rounded-md h-full w-full overflow-hidden">
            <Image
              src={product.images[1]?.url || ""}
              quality={75}
              alt={product.name?.[locale as string]}
              layout="responsive" // Responsive layout instead of fill
              width={942} // Set a base width for the image
              height={1177} // Set a corresponding height for the aspect ratio
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <ProductListOptions
          product={product}
          productsBySlug={productsBySlug?.data?.products}
        />
        <div
          className="absolute font-bold top-[1.5rem] start-[1.5rem] text-white z-20 py-[.3rem] px-[.8rem] text-base
          flex flex-col gap-2 text-center uppercase"
        >
          <div className="bg-[green] uppercase py-[.3rem] px-[.8rem] rounded">
            {category?.data?.name?.[locale as string]}
          </div>
          {!!product.discount && (
            <div className="bg-[#f1c40f] uppercase py-[.3rem] px-[.8rem] rounded transition-all duration-500">
              {userTranslation("Sale")}
            </div>
          )}
        </div>

        <div
          className="absolute z-20 transition-all duration-500 -bottom-[5rem] group-hover:bottom-[1rem]"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div className="flex gap-2 pointer-events-none">
            {_colors?.map((color) => {
              return <ColorItem color={color.color} key={color.color} />;
            })}
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-col items-center justify-center h-[9rem] gap-[1rem]">
        <h4 className="font-normal text-[1.4rem]">
          {product.name?.[locale as string]}
        </h4>
        {!notAvailable ? (
          <div className="flex items-center gap-4 text-[1.6rem] font-medium">
            {!!product.discount && (
              <span className="line-through text-gray-300">
                {formatCurrency(product.price, locale as string)}
              </span>
            )}
            <span className="">
              {formatCurrency(product.saleProduct, locale as string)}
            </span>
          </div>
        ) : (
          <h2 className="text-3xl">{userTranslation("Out of stock")}</h2>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
