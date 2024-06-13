import { Card, Table, TableBody, TableCell, TableRow } from "flowbite-react";
import Image from "next/image";
import { getCurrentDBUser } from "../actions";

export default async function ProfilePage() {
  let user = await getCurrentDBUser();

  return (
    <div className="p-1">
      <Card className="w-full h-full border border-slate-500">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <Image
            alt="Bonnie image"
            height="96"
            src={user?.profilePicURL || ""}
            width="96"
            className="mb-3 rounded-full shadow-lg"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user?.firstName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Branson Resident
          </span>
        </div>
      </Card>

      <div className="text-2xl text-center mt-3 text-bold">Stats</div>
      <Table striped className="border-collapse border border-slate-500">
        <TableBody>
          <TableRow>
            <TableCell>Account Created</TableCell>
            <TableCell>Today</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Upboins Given</TableCell>
            <TableCell>11</TableCell>
          </TableRow>
          {/* <TableRow>
            <TableCell>Packs Opened</TableCell>
            <TableCell>11</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>

      <div className="text-2xl text-center mt-3 text-bold">Achievements</div>
    </div>
  );
}
