"use client"
import { Alert } from "../../../components/ui/alert"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import  Password  from "../../../components/Password"
import { useState } from "react"
import { useRouter } from "next/navigation"

export const DeleteForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const handleValidate = (e) => {
    setEmail(e.target.value);
  }
  
  const handleOnBlur = (e) => {
    setMessage("");
  }


  const onSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('/api/delete', {
        method: 'POST',
        body: JSON.stringify({
          email,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.ok) {
        router.push("/users")
      } else {
        setError((await res.json()).error)
      }
    } catch (error) {
      setError(error?.message)
    }
  }

  return (
   
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <div className="flex items-center">
        <Input
          className="w-full"
          required
          value={email}
          onChange={handleValidate}
          onBlur={handleOnBlur}
          id="email"
          type="email"
        />
        </div>
      </div>
      {error && <Alert className="bg-red-200">{error}</Alert>}
      {message && <Alert className="bg-red-200">{message}</Alert>}
      <div className="w-full">
        <Button className="w-full p-3 bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-md focus-visible:outline-none disabled:bg-indigo-500/80 focus-visible:ring-2 focus-visible:ring-ring focus:scale-[0.98]" size="lg">
          Delete
        </Button>
      </div>
    </form>

  )
}
