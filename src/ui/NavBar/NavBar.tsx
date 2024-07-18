"use client";

import Link from "next/link";
import LandingPageMenu from "../LandingPageMenu/LandingPageMenu";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import NavIcons from "../NavBarIcons/NavBarIcons";
import BaseContainer from "../Container/BaseContainer";
import NavBarCategoriesList from "../NavBarCaegoriesList/NavBarCategoriesList";
import { useState } from "react";

function NavBar() {
  const [showCategoriesMenu, setShowCategoriesMenu] = useState<boolean>(false);

  return (
    <BaseContainer>
      <nav className="relative h-36">
        {/*Mobile Screens*/}
        <div className="md:hidden h-full flex items-center justify-between ">
          <Logo />
          <LandingPageMenu />
        </div>

        {/*Bigger Screens Screens*/}
        <div className="hidden md:flex items-center justify-between gap-8 h-full ">
          <div className="w-1/3 xl:w-1/2 flex items-center   gap-12 ">
            <Logo />
            <ul className="hidden md:flex gap-12 text-[1.6rem]  font-semibold">
              <li
                className="relative"
                onMouseEnter={() => setShowCategoriesMenu(true)}
                onMouseLeave={() => setShowCategoriesMenu(false)}
              >
                <Link href="">Categories</Link>
                <NavBarCategoriesList showCategoriesMenu={showCategoriesMenu} />
              </li>

              <li>
                <Link href="">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="w-2/3 xl:w-1/2 flex justify-between items-center gap-8">
            <SearchBar />
            <NavIcons />
          </div>
        </div>
      </nav>
    </BaseContainer>
  );
}

export default NavBar;
