import { CreditCard, LogOut, PlusCircle, Settings, User, Pin, ExternalLink, Wrench } from "lucide-react"

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

export function ToolsNav() {
  return (
    <div className="flex flex-row items-center">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 rounded-full flex items-center space-x-2">
          <Wrench className="mr-2 h-4 w-4"/>
          Tools
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-row justify-between">
            <p className="text-xs leading-none">Your tools</p>
            <Link
            href="/examples/dashboard" 
            className="text-xs leading-none underline">
            manage
            </Link>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex justify-between">
            <Pin className="mr-2 h-4 w-4" />
            <span>Custom Link 1</span>
            <DropdownMenuShortcut>
            <ExternalLink className="mr-2 h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            <Pin className="mr-2 h-4 w-4" />
            <span>Custom Link 2</span>
            <DropdownMenuShortcut>
            <ExternalLink className="mr-2 h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between" >
            <span>Litmus</span>
            <ExternalLink className="mr-2 h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            <span>Putsmail</span>
            <ExternalLink className="mr-2 h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            <span>TinyPNG</span>
            <ExternalLink className="mr-2 h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            <span>W3C CSS Validator</span>
            <ExternalLink className="mr-2 h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            <span>W3C HTML Validator</span>
            <ExternalLink className="mr-2 h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}