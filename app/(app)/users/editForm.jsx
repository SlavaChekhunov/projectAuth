"use client"

import { Alert } from "../../../components/ui/alert"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { useState } from "react"

export const EditForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null)

   //updateMany
   const onSubmit = async e => {
    e.preventDefault()

    try {
      const res = await fetch('/api/updateMany', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          role
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.ok) {
        signIn()
      } else {
        console.log(error)
        setError((await res.json()).error)
      }
    } catch (error) {
      console.log(error)
      setError(error?.message)
    }
  }

 
  return (
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[370px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Name</Label>
        <Input
          className="w-full"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="name"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          className="w-full"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Role</Label>
        <Input
          className="w-full"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          id="text"
          type="text"
        />
      </div>
      {error && <Alert>{error}</Alert>}
      <div className="w-full">
        <Button className="w-full p-3 bg-indigo-600 text-white hover:bg-indigo-500 disabled:cursor-not-allowed hover:shadow-md focus-visible:outline-none disabled:bg-indigo-500/50 focus-visible:ring-2 focus-visible:ring-ring focus:scale-[0.98]" size="lg" >
          Get New Password
        </Button>
      </div>
    </form>

  )
}
