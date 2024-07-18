"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

function Logo() {
  const { locale } = useParams();

  return (
    <div className="text-2xl tracking-wide  ">
      <Link className="flex items-center gap-3" href={`/${locale}`}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={24}
          height={24}
          className="hidden md:block"
        />
        <span className="hidden xl:block  font-semibold">ORCA</span>
        <Image
          src="/logo.png"
          alt="Logo"
          width={32}
          height={32}
          className="md:hidden block"
        />
      </Link>
    </div>
  );
}

export default Logo;
