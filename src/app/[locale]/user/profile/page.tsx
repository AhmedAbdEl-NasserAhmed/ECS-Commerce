"use client";

import UserSettings from "@/components/UserSettings/UserSettings";
import WishList from "@/components/WishList/WishList";
import BaseTabs from "@/ui/Tabs/Tabs";

function ProfilePage() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-20 gap-16 w-full">
      <BaseTabs
        parentStyle={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
        childStyle={{ border: "none" }}
        orientation="vertical"
        tabs={[
          { label: "Wish List", content: <WishList />, sx: { flexGrow: 1 } },
          { label: "Settings", content: <UserSettings />, sx: { flexGrow: 1 } },
        ]}
      />
    </div>
  );
}

export default ProfilePage;
