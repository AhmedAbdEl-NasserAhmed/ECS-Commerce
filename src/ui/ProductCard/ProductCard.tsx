import Image from "next/image";
import ProductListOptions from "../ProductsList/ProductListOptions";

const ProductCard = ({ product }) => {
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
            product?.images[0] ? "hover:opacity-0" : ""
          }  easy transition-opacity duration-500 rounded-md absolute z-10 h-full w-full overflow-hidden`}
        >
          <Image
            src={product?.images[0]?.url}
            className="object-cover"
            fill
            sizes="25vw"
            alt="image"
          />
        </div>
        {product?.images[1] && (
          <div className="absolute transition-all duration-500 rotate-0 scale-1 group-hover:rotate-3 group-hover:scale-110 rounded-md h-full w-full overflow-hidden">
            <Image
              src={product?.images[1]?.url}
              fill
              sizes="25vw"
              alt="image"
              className="object-cover"
            />
          </div>
        )}

        <ProductListOptions product={product} />
        <div className="absolute font-bold top-[1.5rem] left-[1.5rem] text-white z-20 bg-[green] py-[.3rem] px-[.8rem] text-base rounded">
          {product?.category?.name}
        </div>
        <div
          className="absolute z-20 transition-all duration-500 -bottom-[5rem] group-hover:bottom-[2rem] bg-white w-[75%] text-center p-[1.2rem] text-[1.5rem] font-medium rounded hover:bg-[#ed0534] hover:text-white"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Add to cart
        </div>
      </div>
      <div className="bg-white flex flex-col items-center justify-center h-[9rem] gap-[1rem]">
        <h4 className="font-normal text-[1.4rem]">{product?.name}</h4>
        <div className="flex items-center gap-4 text-[1.6rem] font-medium">
          <span className="line-through text-gray-300">
            {`${product?.price} EGP`}
          </span>
          <span className="">{`${product?.productSalePrice} EGP`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
