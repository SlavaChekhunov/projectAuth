import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";


export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return  new NextResponse(JSON.stringify({
          users
      }), { status: 200 })
            
      } catch (err) {
          console.log(err)
        return new NextResponse(
          JSON.stringify({
            error: err.message
          }),
          {
            status: 500
          }
        )
      }
  }