"use client"
import { Alert } from "../../../components/ui/alert.jsx"
import { Button } from "../../../components/ui/button.jsx"
import { Input } from "../../../components/ui/input.jsx"
import { Label } from "../../../components/ui/label.jsx"
import  Password  from "../../../components/Password"
import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"


export const EditForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
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
    let value = e.target.value;
    setEmail(value);
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

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

//   const handleOnKeyDown = (e) => {
//     const value = e.target.value;
//     const emailCheck = /@publicisna\.com$/.test(value);
//     setChecks({
//       emailCheck
//     });
//   }

  const onSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('/api/updateMany', {
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

    <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Edit Row</CardTitle>
      <CardDescription>Please enter the values down below.</CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={onSubmit}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
            className="w-full"
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
            id="email"
            placeholder="Email"
            type="email" />
          </div>
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
          {/* <div className="flex flex-col space-y-1.5">
            <Label htmlFor="role">Role</Label>
            <Select>
              <SelectTrigger>
              <SelectValue value={role} placeholder="Select a role"/>
              </SelectTrigger>
                <SelectContent position="popper">
                <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
          <SelectItem value="USER"
          onClick = {(e) => setRole("USER")}
          >USER</SelectItem>
          <SelectItem value="ADMIN"
          onClick = {(e) => setRole("ADMIN")}
          >ADMIN</SelectItem>
        </SelectGroup>
                </SelectContent>
            </Select>
          </div> */}
            {error && <Alert className="bg-red-200">{error}</Alert>}
           {message && <Alert className="bg-red-200">{message}</Alert>}
    <CardFooter className="flex justify-between px-0 pt-2">
      <Button variant="outline"
      onClick = {() => {router.push("/users")}}
      >Cancel</Button>
      <Button>Save Changes</Button>
    </CardFooter>
        </div>
      </form>
    </CardContent>
  </Card>
  )
}
