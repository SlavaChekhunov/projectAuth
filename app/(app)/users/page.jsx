import { hash } from "bcrypt";
import { prisma } from "../../../lib/prisma";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { nanoid } from "nanoid"



async function getData() {
 'use server'
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


export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} />
  </div>
  )
}