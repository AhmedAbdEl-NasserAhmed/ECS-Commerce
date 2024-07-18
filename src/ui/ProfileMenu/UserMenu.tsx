import useClickOutside from "@/hooks/useClickOutside";
import { logoutUser } from "@/lib/features/usersSlice/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { UserType } from "@/types/enums";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

function UserMenu({ setIsProfileOpen }) {
  const { locale } = useParams();

  const router = useRouter();

  const ref = useClickOutside({ close: setIsProfileOpen, value: false });

  const user = useAppSelector((state) => state.usersSlice.user);

  const dispatch = useAppDispatch();

  return (
    <ul
      ref={ref}
      className=" absolute text-xl left-0 top-12 bg-white  flex flex-col z-20 gap-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  p-4 rounded-md"
    >
      {user.role === UserType.USER && (
        <li>
          <Link
            onClick={() => setIsProfileOpen(false)}
            href={`/${locale}/user/profile`}
          >
            Profile
          </Link>
        </li>
      )}
      <li
        className="cursor-pointer"
        onClick={() => {
          dispatch(logoutUser());
          localStorage.removeItem("userToken");
          localStorage.removeItem("user");
          setIsProfileOpen(false);
          router.push(`/${locale}`);
          toast.success("Do Not Be Late");
        }}
      >
        Logout
      </li>
    </ul>
  );
}

export default UserMenu;
