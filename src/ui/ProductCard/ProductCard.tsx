import Image from "next/image";
import ProductListOptions from "../ProductsList/ProductListOptions";
import { useGetCategoryByIdQuery } from "@/lib/features/api/categoriesApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import Spinner from "../Spinner/Spinner";
import ColorItem from "../ColorItem/ColorItem";

const ProductCard = ({ product }) => {
  const { data: category, isFetching } = useGetCategoryByIdQuery(
    product?.category,
    { skip: !product?.category }
  );

  if (!product) return <Spinner />;

  return (
    <div
      className=""
      style={{
        boxShadow: "0px 3px 15px 0px #0000000f",
      }}
    >
      <div className="relative w-full cursor-pointer group overflow-hidden h-[40rem]">
        <div
          className={`${
            product.images[0] && product.images[1] ? "hover:opacity-0 " : ""
          }  easy transition-opacity duration-500 rounded-md absolute z-10 h-full w-full overflow-hidden`}
        >
          <Image
            src={product.images[0]?.url}
            className="object-cover"
            fill
            sizes="25vw"
            quality={75}
            alt="image"
          />
        </div>
        {product.images[1] && (
          <div className="absolute transition-all duration-500 rotate-0 scale-1 group-hover:rotate-3 group-hover:scale-110 rounded-md h-full w-full overflow-hidden">
            <Image
              src={product.images[1]?.url}
              fill
              sizes="25vw"
              alt="image"
              className="object-cover"
            />
          </div>
        )}

        <ProductListOptions product={product} />
        <div
          className="absolute font-bold top-[1.5rem] start-[1.5rem] text-white z-20 py-[.3rem] px-[.8rem] text-base
          flex flex-col gap-2 text-center uppercase"
        >
          <div className="bg-[green] py-[.3rem] px-[.8rem] rounded">
            {category?.data?.name}
          </div>
          {!!product.discount && (
            <div className="bg-[#f1c40f] py-[.3rem] px-[.8rem] rounded transition-all duration-500">
              Sale
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
          <div className="flex gap-2">
            {product.colors.map((color) => {
              return <ColorItem color={color.color} key={color.color} />;
            })}
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-col items-center justify-center h-[9rem] gap-[1rem]">
        <h4 className="font-normal text-[1.4rem]">{product.name}</h4>
        <div className="flex items-center gap-4 text-[1.6rem] font-medium">
          {!!product.discount && (
            <span className="line-through text-gray-300">
              {`${product.price} EGP`}
            </span>
          )}
          <span className="">{`${product.saleProduct} EGP`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
