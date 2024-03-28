import { getCurrentUser } from "@/app/lib/action/getCurrentUser";
import DesktopSideBar from "./DesktopSideBar";
import MobileFooter from "./MobileFooter";
import { User } from "@prisma/client";
import getUsers from "@/app/lib/action/getUsers";
import UserList from "./UserList";

export default async function SideBar({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSideBar currentUser={currentUser as User} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">
        {children}</main>
    </div>
  );
}
