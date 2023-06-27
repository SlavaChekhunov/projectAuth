import { CreditCard, LogOut, PlusCircle, Settings, User, Pin, ExternalLink, HelpCircle, DivideCircleIcon } from "lucide-react"

import { Button } from "../../../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu"
import Link from "next/link"
import { Toggle } from "../../../../components/ui/toggle"

export function HelpNav() {
  return (
    <div className="flex flex-row items-center">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 rounded-full flex items-center space-x-2">
          <HelpCircle className="mr-2 h-4 w-4"/>
          Help
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-row justify-between">
            <p className="text-xs leading-none">Your resources</p>
            <Link
            href="/examples/dashboard" 
            className="text-xs leading-none underline">
            manage
            </Link>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
          {/* <Toggle size="sm" aria-label="Toggle italic"> */}
            <Pin className="mr-2 h-4 w-4" />
          {/* </Toggle> */}
            <span>ACME checklist</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
          {/* <Toggle size="sm" aria-label="Toggle italic"> */}
            <Pin className="mr-2 h-4 w-4" />
          {/* </Toggle> */}
            <span>ACME tricks</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
          {/* <Toggle size="sm" aria-label="Toggle italic"> */}
            <Pin className="mr-2 h-4 w-4" />
          {/* </Toggle> */}
            <span>ACME wiki</span>
            <DropdownMenuShortcut>
            <ExternalLink className="mr-2 h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between" >
            <span>Can I email...</span>
            <ExternalLink className="mr-2 h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            <span>Custom Link 2</span>
            <ExternalLink className="mr-2 h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            <span>Custom Link 3</span>
            <ExternalLink className="mr-2 h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}