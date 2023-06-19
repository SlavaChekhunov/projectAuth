"use client"
import { Alert } from "../../../components/ui/alert"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import  Password  from "../../../components/Password"
import { useState } from "react"
import { useRouter } from "next/navigation"

export const AddForm = () => {
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
   
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          className="w-full"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleOnBlur}
          id="name"
          type="name"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <div className="flex items-center">
        <Input
          className="w-full"
          required
          value={email}
          onChange={handleValidate}
          onBlur={handleOnBlur}
        //   onKeyUp={handleOnKeyDown}
          id="email"
          type="email"
        />
        {/* <p className="text-lg">@publicisna.com</p> */}
        </div>
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
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="role">Role</Label>
        <Input
          className="w-full"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
        //   onBlur={handleOnBlur}
          id="role"
          type="role"
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
          Add 
        </Button>
      </div>
    </form>

  )
}
