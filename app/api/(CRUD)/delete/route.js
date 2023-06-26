import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { ash } from "bcrypt";

export async function POST(req) {
    try {

      const { email } = await req.json()

      const emailRegex = /@publicisna\.com$/;

      if (!emailRegex.test(email)) {
      throw new Error('Email address must be from "@publicisna.com" domain.');
      }

      const deleteUser = await prisma.user.delete({
        where: {
          email: email,
        },
      })
  
      console.log(deleteUser)
      return  new NextResponse(JSON.stringify({
        deleteUser
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