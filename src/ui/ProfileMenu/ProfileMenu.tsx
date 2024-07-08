import useClickOutside from "@/hooks/useClickOutside";
import Link from "next/link";

function ProfileMenu({ setIsProfileOpen }) {
  const ref = useClickOutside({ close: setIsProfileOpen, value: false });

  return (
    <ul
      ref={ref}
      className=" absolute text-2xl left-0 top-12 bg-white  flex flex-col z-20 gap-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  p-4 rounded-md"
    >
      <li>
        <Link href="/login">Profile</Link>
      </li>
      <li>Logout</li>
    </ul>
  );
}

export default ProfileMenu;
