"use client"

import { ArrowUpDown, MoreHorizontal, FolderInput, Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users, } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../../../../components/ui/context"



import { Button } from "../../../../components/ui/button.jsx"
import { Checkbox } from "../../../../components/ui/checkbox.jsx"
import { useRouter } from "next/navigation"
import { Input } from "../../../../components/ui/input"
import { useState } from "react";


export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const router = useRouter();

      const handleUsernameClick = (event) => {
        if (event.ctrlKey) {
          event.preventDefault();
          window.open(`/edit?rowId=${row.id}`, '_blank');
        } else {
          router.push('/edit');
        }
      };

      return (
        <>
        {/* <Button variant="ghost" onClick={() => router.push('/edit')}>
          username
        </Button> */}
        <ContextMenu>
        <ContextMenuTrigger className="flex items-center justify-center rounded-md text-sm"
        onClick={handleUsernameClick}>
          username
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset
          onClick={() => window.open(`/edit?rowId=${row.id}`, "_blank")}
          >
            Open link in a new tab
            <ContextMenuShortcut>⌘+📁</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                Save Page As...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>
            Show Bookmarks Bar
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value="pedro">
            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuRadioItem value="pedro">
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
      </>
      );
    },
    
  },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            className="ml-auto hover:bg-gray-200"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
  {
    accessorKey: "id",
    header: "id"
  },
  {
    accessorKey: "role",
    header: "Role"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [deleteInputValue, setDeleteInputValue] = useState("");
      const [open, setOpen] = useState(false);

      const handleDelete = async (rowData) => {
        if (deleteInputValue.toLowerCase() === "delete") {
          try {
            const res = await fetch('/api/delete', {
              method: 'POST',
              body: JSON.stringify({
                email: rowData.email,
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            if (res.ok) {
              console.log(res)
            } else {
              // handle error
            }
          } catch (error) {
            console.log(error)
          }
        }
      }
      

      const payment = row.original
      const router = useRouter();
      return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-auto hover:bg-gray-200">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-50">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
            className="capitalize hover:bg-gray-200"
              onClick={() => navigator.clipboard.writeText(payment.email)}
            >
              Copy email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
            <DropdownMenuItem className="capitalize hover:bg-gray-200"
            >Delete</DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. Are you sure you want to permanently
        delete this user from the table? Type the word "DELETE" to proceed.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Input
      value={deleteInputValue}
      onChange={(e) => {
        setDeleteInputValue(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && deleteInputValue.toLowerCase() === 'delete') {
          handleDelete(row.original);
          setOpen(false);
        }
      }}
    />
    </DialogFooter>
  </DialogContent>
</Dialog>
      )
    },
  },
]