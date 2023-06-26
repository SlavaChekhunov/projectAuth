'use client'

import { CreditCard, LogOut, PlusCircle, Settings, User, Pin, ExternalLink, HelpCircle } from "lucide-react"

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

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "../../../../components/ui/avatar"
import Link from "next/link"

import { signOut } from 'next-auth/react'

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
            <AvatarImage src="/app/assets/OIP.jpg" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
        <div className="flex flex-row justify-between">
            <p className="text-xs leading-none">My accounts</p>
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
            <span>ACME Corp</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>DQ</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Four Seasons</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>FCA</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Walmart</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Wondery</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex flex-row font-normal">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/app/assets/OIP.jpg" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-2 pl-3">
            <p className="text-sm font-medium leading-none">Xara Xendaya</p>
            <Link
            href="/examples/dashboard" 
            className="text-xs leading-none underline">
            edit profile
            </Link>
            <Link
            href="/examples/dashboard" 
            className="text-xs leading-none underline">
            preferences
            </Link>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
