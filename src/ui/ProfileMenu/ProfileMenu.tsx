import UserMenu from "./UserMenu";
import GuestMenu from "./GuestMenu";

function ProfileMenu({ setIsProfileOpen }) {
  const isAuthenticated = true;

  switch (isAuthenticated) {
    case true:
      return <UserMenu setIsProfileOpen={setIsProfileOpen} />;
    case false:
      return <GuestMenu setIsProfileOpen={setIsProfileOpen} />;
  }
}

export default ProfileMenu;
