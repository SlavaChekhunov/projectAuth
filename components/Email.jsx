import { Check, X } from "lucide-react";

const Email = ({emailCheck}) => {
  return (
    <div>
        <p className={`flex items-center ${emailCheck === "valid" ? "text-green-500" : "text-red-500"}`}> 
            {emailCheck === "valid" ? <span className="pr-2"><Check size={16} color="green" /></span> : <span className="pr-2"><X size={16} color="red"/></span>}
            Email address must end with @publicis.com
        </p>
    </div>
  )
}

export default Email
