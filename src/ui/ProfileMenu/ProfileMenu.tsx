import UserMenu from "./UserMenu";
import GuestMenu from "./GuestMenu";
import { useAppSelector } from "@/lib/hooks";
import { UserType } from "@/types/enums";

function ProfileMenu({ setIsProfileOpen }) {
  const token = useAppSelector((state) => state.usersSlice.token);

  console.log("token", token);

  switch (!!token) {
    case true:
      return <UserMenu setIsProfileOpen={setIsProfileOpen} />;
    case false:
      return <GuestMenu setIsProfileOpen={setIsProfileOpen} />;
  }
}

export default ProfileMenu;
