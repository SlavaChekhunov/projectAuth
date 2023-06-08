import { NextResponse } from "next/server";
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.API_KEY)

export async function POST(req) {
    const msg = {
      to: 'slavachekhunov@gmail.com', // Change to your recipient
      from: 'slava.chekhunov@publicisna.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    try{
        const emailRes = await sgMail.send(msg)
        console.log(emailRes)
    }
      catch (err) {
        console.log(err)
      }

      return  new NextResponse(JSON.stringify({
        submitted: true
    }), { status: 200 })
          
  }