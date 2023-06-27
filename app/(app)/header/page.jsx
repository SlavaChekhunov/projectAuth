import Image from 'next/image'
import OIP from "../../../assets/OIP.jpg"
import { MainNav } from './components/main-nav'
import { HelpNav } from './components/help'
import { ToolsNav } from './components/tools'
import { UserNav } from './components/user-nav'


export default function HeaderPage() {
  return (
    <div className="flex flex-row justify-between items-center sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl ">
      <div className="flex flex-row items-center">
      <Image src={OIP} className="w-10 h-10" alt="some alt text" />
      <MainNav className="pl-3"/>
      </div>
      <div className="flex flex-row items-center space-x-6">
      <HelpNav />
      <ToolsNav />
      <div className="w-0.5 h-8 bg-gray-200"></div>
      <UserNav />
      </div>
      </div>
  )
}