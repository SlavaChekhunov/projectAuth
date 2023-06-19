import Image from 'next/image'
import Picture1 from "../../../assets/Picture1.png"
import { EditForm } from "./form"


export default function EditPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
        <Image src={Picture1} alt="some alt text" />
        <h1 className="font-semibold text-2xl">Update Form</h1>
        <EditForm />
      </div>
    </div>
  )
}