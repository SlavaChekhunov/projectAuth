import { NextResponse } from "next/server";
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.API_KEY)

export async function POST(req) {
    const msg = {
      to: 'slavachekhunov@gmail.com', // Change to your recipient
      from: 'slava.chekhunov@publicisna.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'Hello, please activate your account by clicking this link: http://localhost:3000/change',
      //right now we are hard coding localhost to see if it works, but later on we want it to read whatever environment it is sent from.
      //On vercel you can use environment variables to know if youre on a preview branch or production. In prod you can set it to whatever the URL is.
      //Would it be useful to have a token specific to the user at the end of the url as a parameter? It would dynamically read that route and direct them there?
      html: '<strong>Hello, please activate your account by clicking this link: http://localhost:3000/change</strong>',
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