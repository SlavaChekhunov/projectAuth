import { hash } from "bcrypt";
import { Alert } from "../../../components/ui/alert";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { prisma } from "../../../lib/prisma";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { nanoid } from "nanoid"



async function getData() {
  'use server';
    const users = await prisma.user.findMany();

  // return new Array(50).fill(null).map(() => ({
  //     id: nanoid(),
  //     email: "slavachekhunov@gmail.com",
  //     name: "slava",
  //     randomKey: "1234567890abcdef",
  //     role: "ADMIN",
  // }))
  return users.map((user) => ({
  id: user.id,
  email: user.email,
  role: user.role,
  name: user.name,
  }))
}

  async function EditUser(data) {
      'use server'

      const updateUsers = await prisma.user.updateMany({
        where: {
          email: {
            contains: data.get('email'),
          },
        },
        data: {
          name: data.get('name'),
          email: data.get('email'),
          role: data.get('role'),
        },
      })

    }


  async function DeleteUser(data) {
      'use server'

      const deleteUser = await prisma.user.delete({
        where: {
          email: data.get('email'),
        },
      })
  }

  async function AddUser(data) {
      'use server'
      const password = await hash(data.get('password'), 12);

      //email server-side validation
      const emailRegex = /@publicisna\.com$/;

      if (!emailRegex.test(data.get('email'))) {
      throw new Error('Email address must be from "@publicisna.com" domain.');
      }

      //password server-side validation
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      if (!/\d/.test(password)) {
        throw new Error("Password must contain at least one number");
      }
      if (!/[A-Z]/.test(password)) {
        throw new Error("Password must contain at least one uppercase letter");
      }
      if (!/[!@#$%^&*~]/.test(password)) {
        throw new Error("Password must contain at least one special character");
      }


      const user = await prisma.user.create({
        data: {
          name: data.get('name'),
          email: data.get('email'),
          role: data.get('role'),
          password
        }
      })

    }

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} />
      <div className="flex flex-row space-x-4">
       <form action={EditUser} className="space-y-12 w-full sm:w-[400px]">
       <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
           className="w-full"
           required
           name="name"
           id="name"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
           className="w-full"
           required
           name="email"
           id="email"
           type="email"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="role">Role</Label>
        <Input
            className="w-full"
            name="role"
            id="role"
        />
      </div>
      <div className="w-full">
        <Button className="w-full p-3 bg-indigo-600 text-white hover:bg-indigo-500 disabled:cursor-not-allowed hover:shadow-md focus-visible:outline-none disabled:bg-indigo-500/50 focus-visible:ring-2 focus-visible:ring-ring focus:scale-[0.98]" size="lg" >
          Edit
        </Button>
      </div>
    </form>
       <form action={AddUser} className="space-y-12 w-full sm:w-[400px]">
       <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
           className="w-full"
           required
           name="name"
           id="name"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
           className="w-full"
           required
           name="email"
           id="email"
           type="email"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
           className="w-full"
           required
           name="password"
           id="password"
           type="password"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="role">Role</Label>
        <Input
            className="w-full"
            name="role"
            id="role"
            />
      </div>
      <div className="w-full">
        <Button className="w-full p-3 bg-indigo-600 text-white hover:bg-indigo-500 disabled:cursor-not-allowed hover:shadow-md focus-visible:outline-none disabled:bg-indigo-500/50 focus-visible:ring-2 focus-visible:ring-ring focus:scale-[0.98]" size="lg" >
          Add
        </Button>
      </div>
    </form>
    <form action={DeleteUser} className="space-y-12 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
           className="w-full"
           required
           name="email"
           id="email"
           type="email"
        />
      </div>
      <div className="w-full">
        <Button className="w-full p-3 bg-indigo-600 text-white hover:bg-indigo-500 disabled:cursor-not-allowed hover:shadow-md focus-visible:outline-none disabled:bg-indigo-500/50 focus-visible:ring-2 focus-visible:ring-ring focus:scale-[0.98]" size="lg" >
          Delete
        </Button>
      </div>
    </form>
    </div>
  </div>
  )
}