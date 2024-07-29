import { IoStar } from "react-icons/io5";

function ReactStarsFallBack() {
  const starsArray = [1, 2, 3, 4, 5];

  return (
    <ul className="flex items-center gap-[0.2rem]">
      {starsArray.map((star) => (
        <li key={star} className="text-lg text-gray-500">
          <IoStar />
        </li>
      ))}
    </ul>
  );
}

export default ReactStarsFallBack;
