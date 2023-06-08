'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Alert } from "../../../components/ui/alert"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { signIn } from 'next-auth/react'
import { useState } from "react"

export const Form = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  //next auth adds a callbackURL to the query params - this tells where you should go after you sign in. 
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl
      })
      console.log('Res', res)
      if (!res?.error) {
        router.push(callbackUrl)
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
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
        <Label htmlFor="password">Password</Label>
        <Input
          className="w-full"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
        />
      </div>
      {error && <Alert>{error}</Alert>}
      <div className="w-full">
        <Button className="w-full p-3 bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-md focus-visible:outline-none disabled:bg-indigo-500/50 focus-visible:ring-2 focus-visible:ring-ring focus:scale-[0.98]" size="lg" >
          Login
        </Button>
      </div>
    </form>
  )
}