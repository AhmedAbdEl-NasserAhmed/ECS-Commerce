import UserMenu from "./UserMenu";
import GuestMenu from "./GuestMenu";
import { useAppSelector } from "@/lib/hooks";
import { UserType } from "@/types/enums";
import { useState } from "react";
import Image from "next/image";
import useClickOutside from "@/hooks/useClickOutside";
import UserGreeting from "../UserGreeting/UserGreeting";

function ProfileMenu() {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const token = useAppSelector((state) => state.usersSlice.token);

  const user = useAppSelector((state) => state.usersSlice.user);

  const ref = useClickOutside({ close: setIsProfileOpen, value: false });

  function handleLoginClick() {
    setIsProfileOpen((open) => !open);
  }

  return (
    <div ref={ref}>
      {user && user.isActive ? (
        <UserGreeting onClick={handleLoginClick} />
      ) : (
        <div onClick={() => setIsProfileOpen((open) => !open)}>
          <Image
            src="/profile.png"
            alt="profile"
            width={22}
            height={22}
            className="cursor-pointer"
          />
        </div>
      )}

      {isProfileOpen && (
        <>
          {token ? (
            <UserMenu setIsProfileOpen={setIsProfileOpen} />
          ) : (
            <GuestMenu setIsProfileOpen={setIsProfileOpen} />
          )}
        </>
      )}
    </div>
  );

  // switch (!!token) {
  //   case true:
  //     return <UserMenu setIsProfileOpen={setIsProfileOpen} />;
  //   case false:
  //     return <GuestMenu setIsProfileOpen={setIsProfileOpen} />;
  // }
}

export default ProfileMenu;
