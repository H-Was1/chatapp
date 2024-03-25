import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default async function Home() {
  // await prisma?.user.deleteMany({});
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src={"/images/messenger.png"}
          width={48}
          height={48}
          alt="logo"
          className="mx-auto w-auto"
        ></Image>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign In to Your Account
        </h2>
      </div>
      {/* Auth implementation here . . . */}
      <AuthForm />
    </div>
  );
}
