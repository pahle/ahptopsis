import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export const GET = async (req) => {
  const id = req.nextUrl.searchParams.get("id");

  const data = await prisma.alternatif.findUnique({
    where: {
      id: parseInt(id),
    },
  });

//   return json
    return new NextResponse(JSON.stringify(data), {
        status: 200,
    });
};