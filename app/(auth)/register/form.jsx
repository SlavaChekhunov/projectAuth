"use client"
import { Alert } from "../../../components/ui/alert.jsx"
import { Button } from "../../../components/ui/button.jsx"
import { Input } from "../../../components/ui/input.jsx"
import { Label } from "../../../components/ui/label.jsx"
import  Password  from "../../../components/Password"
import { signIn } from 'next-auth/react'
import { useState } from "react"

export const RegisterForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [pwdRequired, setPwdRequired] = useState(false);
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false,
  })

  const handleValidate = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleOnFocus = (e) => {
    setPwdRequired(true);
  }

  const handleOnBlur = (e) => {
    setPwdRequired(false);
    setMessage("");
  }


  const handleOnKeyUp = (e) => {
    const value = e.target.value;
    const capsLetterCheck = /[A-Z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length >= 8;
    const specialCharCheck = /[!@#$%^&*~]/.test(value);
    setChecks({
      capsLetterCheck,
      numberCheck,
      pwdLengthCheck,
      specialCharCheck
    });
  }

  const onSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.ok) {
        signIn()
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
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          className="w-full"
          required
          value={password}
          onChange={handlePassword}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onKeyUp={handleOnKeyUp}
          id="password"
          type="password"
        />
      </div>
      {pwdRequired? <Password 
        capsLetterFlag={checks.capsLetterCheck ? "valid" : "invalid"}
        numberFlag={checks.numberCheck ? "valid" : "invalid"}
        pwdLengthCheck={checks.pwdLengthCheck ? "valid" : "invalid"}
        specialCharCheck={checks.specialCharCheck ? "valid" : "invalid"}
      /> : null}
      {error && <Alert className="bg-red-200">{error}</Alert>}
      {message && <Alert className="bg-red-200">{message}</Alert>}
      <div className="w-full">
        <Button className="w-full p-3 bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-md focus-visible:outline-none disabled:bg-indigo-500/80 focus-visible:ring-2 focus-visible:ring-ring focus:scale-[0.98]" size="lg">
          Register
        </Button>
      </div>
    </form>

  )
}
