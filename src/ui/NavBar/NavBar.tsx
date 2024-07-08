import Link from "next/link";
import LandingPageMenu from "../LandingPageMenu/LandingPageMenu";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import NavIcons from "../NavBarIcons/NavBarIcons";

function NavBar() {
  return (
    <nav className=" relative h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
      {/*Mobile Screens*/}
      <div className="md:hidden h-full flex items-center justify-between ">
        <Logo />
        <LandingPageMenu />
      </div>

      {/*Bigger Screens Screens*/}
      <div className="hidden md:flex items-center justify-between gap-8 h-full ">
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12 ">
          <Logo />
          <ul className="hidden xl:flex gap-4 text-[1.4rem] ">
            <li>
              <Link href="">Home Page</Link>
            </li>
            <li>
              <Link href="">Shop</Link>
            </li>
            <li>
              <Link href="">Deals</Link>
            </li>
            <li>
              <Link href="">About</Link>
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
  );
}

export default NavBar;
