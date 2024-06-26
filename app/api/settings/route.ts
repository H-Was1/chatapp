import { getCurrentUser } from "@/app/lib/action/getCurrentUser";
import prismadb from "@/app/lib/prismadb";
import { NextResponse } from "next/server";


export async function POST(
  request: Request
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const {
      name,
      image
    } = body;

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const updatedUser = await prismadb.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        image: image,
        name: name
      }
    });

    return NextResponse.json(updatedUser)
  } catch (error: any) {
    console.log(error, 'ERROR_SETTINGS');
    return new NextResponse('Internal Error', { status: 500 });
  }
}