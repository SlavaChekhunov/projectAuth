import Link from 'next/link'
import { RegisterForm } from './form'
import Image from 'next/image'
import Picture1 from "../../../assets/Picture1.png"
import { hash } from "bcrypt";
import { prisma } from "../../../lib/prisma";
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

export default function RegisterPage() {

  // async function registerUser(data) {
  //   'use server'

  //   const hashed = await hash(data.get('password'), 12)

  //   const emailRegex = /@publicisna\.com$/;

  //   if (!emailRegex.test(data.get('email'))) {
  //     throw new Error('Email address must be from "@publicisna.com" domain.');
  //   }

  //   const user = await prisma.user.create({
  //     data: {
  //       name: data.get('name'),
  //       email: data.get('email'),
  //       password: hashed

  //     }
  //   })

    

  // }




  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
      <Image src={Picture1} alt="some alt text" />
        <h1 className="font-semibold text-2xl">Create your Account</h1>
        {/* <form action={registerUser} className="space-y-12 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          className="w-full"
          required
          name="email"
          id="email"
          type="email"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          className="w-full"
          required
          name="password"
          id="password"
          type="password"
        />
      </div>
      <div className="w-full">
        <Button className="w-full p-3 bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-md focus-visible:outline-none disabled:bg-indigo-500/80 focus-visible:ring-2 focus-visible:ring-ring focus:scale-[0.98]" size="lg">
          Register
        </Button>
      </div>
    </form> */}
        <RegisterForm />
        <p className="text-center">
          Have an account?{' '}
          <Link className="text-indigo-500 hover:underline" href="/login">
            Sign in
          </Link>{' '}
        </p>
      </div>
    </div>
  )
}