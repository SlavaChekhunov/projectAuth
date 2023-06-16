//STEP 1: encypt the password using bcrypt
//STEP 2: save it to the database
//STEP 3: send some message to the user letting them know that they were successfully registered

import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req) {
    try {
      const { email, name, role } = await req.json()

      //for the reset we do need the email field because, if the user forgot their password they wouldnt be logged in
      //therefore we cannot just simply get the session data from the server.

      const updateUsers = await prisma.user.updateMany({
        where: {
          email: {
            contains: email,
          },
        },
        data: {
          name: name,
          email: email,
          role: role
        },
      })
  
      console.log(updateUsers)
      return  new NextResponse(JSON.stringify({
        updateUsers
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