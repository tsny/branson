import BNavbar from "../navbar";
import {
  Avatar,
  Button,
  Card,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import prisma from "@/lib/prisma";
import {
  getSessionUser,
  giveAllUsersBoins,
  setUserBoins,
  setUserBoinsFromForm,
} from "../actions";

export default async function Page() {
  let user = await getSessionUser();

  let users = (await prisma.user.findMany()).map((u) => (
    <TableRow
      className="bg-white dark:border-gray-700 dark:bg-gray-800"
      key={u.id}
    >
      <TableCell>{u.id}</TableCell>
      <TableCell className="flex gap-2">
        <Avatar className="inline" img={u.profilePicURL || ""}></Avatar>
        <p className="inline"> {u.email} </p>
      </TableCell>
      <TableCell>{u.firstName}</TableCell>
      <TableCell>
        <form className="flex" action={setUserBoinsFromForm}>
          <input name="boins" defaultValue={u.boins} type="number"></input>
          <input name="userid" defaultValue={u.id} hidden></input>
          <Button color="success" className="ml-2 inline" type="submit">
            Save
          </Button>
        </form>
      </TableCell>
      <TableCell>{u.role}</TableCell>
    </TableRow>
  ));

  return (
    <main className="w-full h-full pt-3 flex-col items-center justify-between">
      <Card className="text-black">You are {user?.email}</Card>
      <div>
        <h1 className="text-4xl font-bold text-center text-gray-800 pt-8 mb-8">
          Admin
        </h1>
      </div>
      <Card>
        <form action={giveAllUsersBoins}>
          <Label>Give All Users Daily Allowance</Label>
          <input
            className="ml-2 "
            name="boins"
            defaultValue={5}
            type="number"
          ></input>
          <Button className="ml-2 inline" type="submit">
            Submit
          </Button>
        </form>
      </Card>
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
  );
}
