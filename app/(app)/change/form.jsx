'use client'

import Password from "../../../components/Password"
import { Alert } from "../../../components/ui/alert"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { useState } from "react"

export const Form = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [active, setActive] = useState(false);
  const [pwdRequired, setPwdRequired] = useState(false);
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false,
  })

  const onSubmit = async (e) => {
    e.preventDefault()
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleOnFocus = (e) => {
    setPwdRequired(true);
  }

  const handleOnBlur = (e) => {
    setPwdRequired(false);
    
}

  const handleOnKeyUp = (e) => {
    const value = e.target.value;
    const capsLetterCheck = /[A-Z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length >= 8;
    const specialCharCheck = /[!@#$%^&*]/.test(value);
    setChecks({
        capsLetterCheck,
        numberCheck,
        pwdLengthCheck,
        specialCharCheck
    });
    setActive(!(capsLetterCheck && numberCheck && pwdLengthCheck && specialCharCheck));
    if (password && confirmPassword) {
        if (password === confirmPassword) {
          setError('Passwords Match');
        } else {
          setError('Passwords do not match');
        }
      }
  }

 




  return (
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">New Password</Label>
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
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Confirm Password</Label>
        <Input
          className="w-full"
          required
          value={confirmPassword}
          onChange={handleConfirmPassword}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onKeyUp={handleOnKeyUp}
          id="password"
          type="password"
        />
      </div>
      {error && (
    <p style={{ color: error === 'Passwords Match' ? 'green' : 'red' }}>
      <Alert>{error}</Alert>
    </p>
  )}
      <div className="w-full">
        <Button disabled = {active} className="w-full p-3 bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-md disabled:bg-indigo-500/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus:scale-[0.98]" size="lg">
          Reset Password
        </Button>
      </div>
    </form>
  )
}