import Image from "next/image";
import { useState } from "react";
import ResponsiveMenuLinks from "./ResponsiveMenuLinks";

function NavMenu() {
  const [showMenuLinks, setShowMenuLinks] = useState<boolean>(false);

  return (
    <>
      <Image
        onClick={() => setShowMenuLinks((show) => !show)}
        className="cursor-pointer md:hidden"
        src="/menu.png"
        alt="menu"
        width={16}
        height={42}
      />
      <ResponsiveMenuLinks
        showMenuLinks={showMenuLinks}
        setShowMenuLinks={setShowMenuLinks}
      />
    </>
  );
}

export default NavMenu;
