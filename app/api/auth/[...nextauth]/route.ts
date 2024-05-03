import NextAuth from "next-auth";

import prismadb from "@/app/lib/prismadb";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
