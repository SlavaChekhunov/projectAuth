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

      //email server-side validation
      const emailRegex = /@publicisna\.com$/;

      if (!emailRegex.test(email)) {
      throw new Error('Email address must be from "@publicisna.com" domain.');
      }

      //password server-side validation
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      if (!/\d/.test(password)) {
        throw new Error("Password must contain at least one number");
      }
      if (!/[A-Z]/.test(password)) {
        throw new Error("Password must contain at least one uppercase letter");
      }
      if (!/[!@#$%^&*~]/.test(password)) {
        throw new Error("Password must contain at least one special character");
      }
  
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