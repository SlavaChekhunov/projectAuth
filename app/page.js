import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { LoginButton, LogoutButton } from "../components/Auth"
import { Skeleton } from "../components/ui/skeleton"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <LoginButton />
      <LogoutButton />
      <h2>Server Session </h2>
      <pre>{JSON.stringify(session)}</pre>
      <div className="rounded-md border space-y-4 py-10">
  <div className="flex justify-evenly space-x-12">
    <div className="flex w-4/5 space-x-4">
      <Skeleton className="h-9  w-[250px]" />
      <Skeleton className="h-9 w-[75px]" />
    </div>
    <Skeleton className="h-9 w-[75px]" />
  </div>
  <div className="table-container px-10">
  <div className="flex items-center space-x-12 py-1">
      <Skeleton className="h-9 w-[1150px]" />
  </div>
  <div className="flex items-center space-x-12 py-1">
      <Skeleton className="h-11 w-[1150px]" />
  </div>
  <div className="flex items-center space-x-12 py-1">
      <Skeleton className="h-11 w-[1150px]" />
  </div>
  <div className="flex items-center space-x-12 py-1">
      <Skeleton className="h-11 w-[1150px]" />
  </div>
  <div className="flex items-center space-x-12 py-1">
      <Skeleton className="h-11 w-[1150px]" />
  </div>
  <div className="flex items-center space-x-12 py-1">
      <Skeleton className="h-11 w-[1150px]" />
  </div>
  <div className="flex items-center space-x-12 py-1">
      <Skeleton className="h-11 w-[1150px]" />
  </div>
  <div className="flex items-center space-x-12 py-1">
      <Skeleton className="h-11 w-[1150px]" />
  </div>
  </div>
  <div className="flex items-center justify-end space-x-2">

  <div className="flex-1 text-sm text-muted-foreground px-10">
    <Skeleton className="h-4 w-[75px]" />
    </div>
 <div className="flex items-center justify-end space-x-2 px-10">
    <Skeleton className="h-9 w-[75px]" />
    <Skeleton className="h-9 w-[75px]" />
    <Skeleton className="h-9 w-[75px]" />
 </div>
</div>
</div>
    </main>
    
  )
}