import { Form } from './form'
import Image from 'next/image'
import Picture1 from "../../../assets/Picture1.png"

export default function ResetPassword() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
      <Image src={Picture1} alt="some alt text" />
        <p className="font-semibold text-2xl">Change Password</p>
        <Form />
      </div>
    </div>
  )
}
