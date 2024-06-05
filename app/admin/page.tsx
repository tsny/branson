import BNavbar from "../navbar";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import prisma from "@/lib/prisma";
import { getSessionUser } from "../actions";

export default async function Page() {
  let user = await getSessionUser();

  let users = (await prisma.user.findMany()).map((u) => (
    <TableRow
      className="bg-white dark:border-gray-700 dark:bg-gray-800"
      key={u.id}
    >
      <TableCell>{u.id}</TableCell>
      <TableCell>{u.email}</TableCell>
      <TableCell>{u.firstName}</TableCell>
      <TableCell>{u.boins}</TableCell>
      <TableCell>{u.role}</TableCell>
    </TableRow>
  ));

  return (
    <div>
      <BNavbar></BNavbar>
      <main className="w-full h-full pt-3 flex-col items-center justify-between">
        <Card className="text-black">You are {user?.email}</Card>
        <Card className="overflow-x-auto text-black w-full">
          <Table>
            <TableHead>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Boins</TableHeadCell>
              <TableHeadCell>Role</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">Edit</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">{users}</TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
}
