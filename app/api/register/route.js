//STEP 1: encypt the password using bcrypt
//STEP 2: save it to the database
//STEP 3: send some message to the user letting them know that they were successfully registered

import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";


export async function POST(req) {
    try {
      const { email, password } = await req.json()
      const hashed = await hash(password, 12)
  
      const user = await prisma.user.create({
        data: {
          email,
          password: hashed,
        }
      })
  
      return  new NextResponse(JSON.stringify({
        user: {
            email: user.email
        }
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