import Link from "next/link";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h2 className="text-center">
        <p className="text-[5rem] text-black">PETI TECH</p>
        <p className="text-[5rem] text-black">E - COMMERCE SITE</p>
      </h2>
      <div>
        <Link
          className="text-4xl text-black  flex items-center gap-4 font-semibold p-5"
          href="/admin"
        >
          Go To Admin Page
          <span>
            <HiArrowRightEndOnRectangle />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
