import Image from 'next/image'
import Picture1 from "../../../assets/Picture1.png"
import { AddForm } from "./form"


export default function AddPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
        <AddForm />
    </div>
  )
}