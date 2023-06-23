import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { prisma } from "../../../lib/prisma";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.API_KEY);

export async function POST(req) {
  const token = `${randomUUID()}${randomUUID()}`;
  const expirationTime = Date.now() + 3600000;

  const msg = {
    to: "slavachekhunov@gmail.com",
    from: "slava.chekhunov@publicisna.com",
    subject: "Reset Password",
    text: `Hello, please reset your password by clicking this link: http://localhost:3000/change?token=${token}`,
    html: `<strong>Hello, please reset your password by clicking this link: <a href="http://localhost:3000/change?token=${token}">Reset Password</a></strong>`,
  };
  try {
    const emailRes = await sgMail.send(msg);
    await prisma.token.create({
      data: {
        token: token,
        expirationTime: expirationTime,
      },
    });
  } catch (err) {
    console.error(err);
  }

  try {
    const tokenData = await prisma.token.findUnique({
      where: {
        token,
      },
      select: {
        expirationTime: true,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return new NextResponse(
    JSON.stringify({
      submitted: true,
    }),
    { status: 200 }
  );
}

// Example route handler for handling the password reset link
export async function GET(req) {
  const { token } = req.query; // Extract the token from the query parameters
  const isTokenValid = await verifyToken(token); // Verify if the token is valid and not expired

  if (isTokenValid) {
    // Token is valid, allow the user to reset their password
    return new NextResponse("Reset password page");
  } else {
    // Token is invalid or expired
    return new NextResponse("Invalid or expired token");
  }
}

async function verifyToken(token) {
  // Perform token verification logic
  // Compare the expiration time with the current time
  const currentTimestamp = Date.now();
  const expirationTime = await getTokenExpirationTime(token); // Retrieve the expiration time associated with the token from your data storage

  return expirationTime > currentTimestamp;
}
