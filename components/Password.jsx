import { Check, X } from "lucide-react";

const Password = ({capsLetterFlag, numberFlag, pwdLengthCheck, specialCharCheck}) => {
  return (
    <div>
        <p className={`flex items-center ${capsLetterFlag === "valid" ? "text-green-500" : "text-red-500"}`}> 
            {capsLetterFlag === "valid" ? <span className="pr-2"><Check size={16} color="green" /></span> : <span className="pr-2"><X size={16} color="red"/></span>}
            Must contain at least one capital letter
        </p>
        <p className={`flex items-center ${numberFlag === "valid" ? "text-green-500" : "text-red-500"}`}> 
            {numberFlag === "valid" ? <span className="pr-2"><Check size={16} color="green"/></span> : <span className="pr-2"><X size={16} color="red"/></span>}
            Must contain at least one number
        </p>
        <p className={`flex items-center ${pwdLengthCheck === "valid" ? "text-green-500" : "text-red-500"}`}> 
            {pwdLengthCheck === "valid" ? <span className="pr-2"><Check size={16} color="green"/></span> : <span className="pr-2"><X size={16} color="red"/></span>}
            Must be at least 8 characters long
        </p>
        <p className={`flex items-center ${specialCharCheck === "valid" ? "text-green-500" : "text-red-500"}`}> 
            {specialCharCheck === "valid" ? <span className="pr-2"><Check size={16} color="green"/></span> : <span className="pr-2"><X size={16} color="red"/></span>}
            Must contain at least one special character
        </p>
    </div>
  )
}

export default Password


