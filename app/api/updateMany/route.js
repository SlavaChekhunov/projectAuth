//STEP 1: encypt the password using bcrypt
//STEP 2: save it to the database
//STEP 3: send some message to the user letting them know that they were successfully registered

import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { hash } from "bcrypt";

export async function POST(req) {
    try {
      const { email, name, role, password } = await req.json()

      const hashed = await hash(password, 12);

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

      const updateUsers = await prisma.user.updateMany({
        where: {
          email: {
            contains: email,
          },
        },
        data: {
          name: name,
          password: hashed,
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