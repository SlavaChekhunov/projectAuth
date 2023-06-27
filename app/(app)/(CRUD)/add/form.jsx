"use client"
import { Alert } from "../../../../components/ui/alert.jsx"
import { Button } from "../../../../components/ui/button.jsx"
import { Input } from "../../../../components/ui/input.jsx"
import { Label } from "../../../../components/ui/label.jsx"
import  Password  from "../../../../components/Validation/Password"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Email from "../../../../components/Validation/Email"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select"

export const AddForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [pwdRequired, setPwdRequired] = useState(false);
  const [EmailRequired, setEmailRequired] = useState(false);
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false,
    emailCheck: false
  })

  const handleValidate = (e) => {
    let value = e.target.value;
    setEmail(value);
  }
  
  

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleOnFocus = (e) => {
    setPwdRequired(true);
  }

  const handleOnFocusEmail = (e) => {
    setEmailRequired(true);
  }

  const handleOnBlur = (e) => {
    setPwdRequired(false);
    setEmailRequired(false);
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

  const handleOnKeyDown = (e) => {
    const value = e.target.value;
    const emailCheck = /@publicisna\.com$/.test(value);
    setChecks({
      emailCheck
    });
  }

  const onSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('/api/add', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
          role
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

    <Card className="w-[400px]">
    <CardHeader>
      <CardTitle>Add Row</CardTitle>
      <CardDescription>Please enter the values down below.</CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={onSubmit}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
            className="w-full"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleOnBlur}
            id="name"
            type="name"
            placeholder="Username" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Email</Label>
            <Input
            className="w-full"
            required
            value={email}
            onChange={handleValidate}
            onBlur={handleOnBlur}
            onFocus={handleOnFocusEmail}
            onKeyUp={handleOnKeyDown}
            placeholder="Email"
            id="email"
            type="email" />
          </div>
         {EmailRequired? <Email
         emailCheck={checks.emailCheck ? "valid" : "invalid"}
        /> : null}
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
          placeholder="Password"
          />
          </div>
          {pwdRequired? <Password 
            capsLetterFlag={checks.capsLetterCheck ? "valid" : "invalid"}
            numberFlag={checks.numberCheck ? "valid" : "invalid"}
            pwdLengthCheck={checks.pwdLengthCheck ? "valid" : "invalid"}
            specialCharCheck={checks.specialCharCheck ? "valid" : "invalid"}
          /> : null}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="role">Role</Label>
            <Input
            className="w-full"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onBlur={handleOnBlur}
            id="role"
            placeholder="Role"
            type="role" />
          </div>
            {error && <Alert className="bg-red-200">{error}</Alert>}
           {message && <Alert className="bg-red-200">{message}</Alert>}
    <CardFooter className="flex justify-between px-0 pt-2">
      <Button variant="outline"
      onClick = {() => {router.push("/admin/users")}}
      >Cancel</Button>
      <Button>Add</Button>
    </CardFooter>
        </div>
      </form>
    </CardContent>
  </Card>
  )
}
