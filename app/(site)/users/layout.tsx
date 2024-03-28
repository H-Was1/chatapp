import getUsers from "@/app/lib/action/getUsers";
import SideBar from "../components/SideBar";
import UserList from "../components/UserList";

export default async function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const users = await getUsers();

  return (
    <SideBar>
      <div className="h-full">
        <UserList items={users} />

        {children}
      </div>
    </SideBar>
  );
}
