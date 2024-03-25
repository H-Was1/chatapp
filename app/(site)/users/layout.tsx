import SideBar from "../components/SideBar";

export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SideBar>
      <div className="h-full">{children}</div>
    </SideBar>
  );
}
