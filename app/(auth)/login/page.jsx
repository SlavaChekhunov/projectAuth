import Link from 'next/link'
import { Form as LoginForm } from './form'
import Image from 'next/image'
import Picture1 from "../../../assets/Picture1.png"


export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
        <Image src={Picture1} alt="some alt text" />
        <h1 className="font-semibold text-2xl">Sign in</h1>
        <LoginForm />
        <p className="text-center">
          <Link className="text-indigo-500 hover:underline" href="/reset">
            Forgot your password?
          </Link>{' '}
        </p>
        <p className="text-center">
          Need to create an account?{' '}
          <Link className="text-indigo-500 hover:underline" href="/register">
            Create Account
          </Link>{' '}
        </p>
      </div>
    </div>
  )
}