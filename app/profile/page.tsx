import {
  Button,
  Card,
  Label,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import Image from "next/image";
import { getCurrentDBUser, updateUser } from "../actions";

export default async function ProfilePage() {
  let user = await getCurrentDBUser();

  return (
    <div className="p-3">
      <Card className="w-full h-full border border-slate-500">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <Image
            alt="user image"
            height="96"
            width="96"
            src={user?.profilePicURL || ""}
            className="mb-3 border border-gray-800 rounded-full shadow-lg"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user?.firstName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Branson Resident
          </span>
        </div>
      </Card>

      <form
        action={updateUser}
        className="bg-white p-2 border border-gray-800 rounded"
      >
        <Label>Profile Pic URL</Label>
        <TextInput
          className="mb-2"
          name="profilePicURL"
          defaultValue={user?.profilePicURL ?? ""}
        ></TextInput>
        <input readOnly hidden name="userid" value={user?.id}></input>
        <Button type="submit">Save</Button>
      </form>

      <div className="text-2xl text-center mt-3 text-bold">Stats</div>
      <Table
        striped
        className="border-collapse border border-slate-500 text-sm text-bold"
      >
        <TableBody>
          <TableRow>
            <TableCell>Upboins Given</TableCell>
            <TableCell>{user?.upboinsGiven}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Packs Opened</TableCell>
            <TableCell>{user?.packsOpened}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="text-2xl text-center mt-3 text-bold">Achievements</div>
    </div>
  );
}
