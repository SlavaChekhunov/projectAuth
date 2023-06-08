import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { LoginButton, LogoutButton } from "../components/Auth"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <LoginButton />
      <LogoutButton />
      <h2>Server Session </h2>
      <pre>{JSON.stringify(session)}</pre>
    </main>
  )
}