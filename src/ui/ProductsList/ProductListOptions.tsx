import { HiViewGrid } from "react-icons/hi";
import { HiEye, HiOutlineHeart } from "react-icons/hi2";

function ProductListOptions({ className }) {
  return (
    <ul className={className}>
      <li className="flex items-center gap-7 ">
        <span
          onClick={() => console.log("hello")}
          className="text-2xl bg-white flex items-center justify-center w-11  h-11 rounded-full"
        >
          <HiEye />
        </span>
      </li>
      <li className="flex items-center gap-7 ">
        <span
          onClick={() => console.log("hello")}
          className="text-2xl bg-white flex items-center justify-center w-11 h-11 rounded-full"
        >
          <HiOutlineHeart />
        </span>
      </li>
      <li className="flex items-center gap-7 ">
        <span
          onClick={() => console.log("hello")}
          className="text-2xl bg-white flex items-center justify-center w-11 h-11 rounded-full"
        >
          <HiViewGrid />
        </span>
      </li>
    </ul>
  );
}

export default ProductListOptions;
