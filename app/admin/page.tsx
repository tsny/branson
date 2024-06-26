import {
  Avatar,
  Button,
  Label,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "flowbite-react";
import prisma, { updateConfigWithValue } from "@/lib/prisma";
import {
  getSessionUser,
  giveAllUsersBoins,
  setUserBoinsFromForm,
  setUserRole,
} from "../actions";
import { revalidatePath } from "next/cache";

export default async function Page() {
  let user = await getSessionUser();

  let configDiv = (await prisma.config.findMany()).map((cfg) => (
    <tr key={cfg.name} className="text-sm">
      <td>{cfg.name}</td>
      <td>
        <form
          action={async (formData) => {
            "use server";
            const cfg = formData.get("name") as string;
            const val = formData.get("val") as string;
            await updateConfigWithValue(cfg, val);
            revalidatePath("/");
          }}
        >
          <input name="name" value={cfg.name} readOnly hidden></input>
          <input
            name={"val"}
            defaultValue={cfg.value}
            className="rounded"
          ></input>
          <Button type="submit" className="inline" size={"xs"}>
            Save
          </Button>
        </form>
      </td>
    </tr>
  ));

  let users = (await prisma.user.findMany()).map((u) => (
    <TableRow
      className="bg-white dark:border-gray-700 dark:bg-gray-800"
      key={u.id}
    >
      <TableCell className="flex gap-2">
        <Avatar className="inline" img={u.profilePicURL || ""}></Avatar>
        <p className="inline"> {u.email} </p>
      </TableCell>
      <TableCell>{u.numPacks} packs</TableCell>
      <TableCell>{u.dust} dust</TableCell>
      <TableCell>
        <form className="flex" action={setUserBoinsFromForm}>
          <input
            className="w-24"
            name="boins"
            defaultValue={u.boins}
            type="number"
          ></input>
          <input name="userid" defaultValue={u.id} hidden></input>
          <Button
            color="success"
            size={"xs"}
            className="ml-1 inline"
            type="submit"
          >
            Save
          </Button>
        </form>
      </TableCell>
      <TableCell>
        <form
          className="flex"
          action={async (formData) => {
            "use server";
            const role = formData.get("role") as string;
            const userid = formData.get("userid") as string;
            await setUserRole(+userid, role);
          }}
        >
          <input
            className="p-1 border rounded w-24"
            name="role"
            defaultValue={u.role ?? "user"}
          ></input>
          <input name="userid" defaultValue={u.id} hidden></input>
          <Button
            color="success"
            size={"xs"}
            className="ml-1 inline"
            type="submit"
          >
            Save
          </Button>
        </form>
      </TableCell>
    </TableRow>
  ));

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-gray-800 pt-2 mb-2">
        Admin
      </h1>
      <form className="p-2" action={giveAllUsersBoins}>
        <Label>Give All Users Daily Allowance</Label>
        <input
          className="ml-2 rounded w-24"
          name="boins"
          defaultValue={5}
          type="number"
        ></input>
        <Button size={"xs"} className="ml-2 inline" type="submit">
          Submit
        </Button>
      </form>
      <div className="overflow-x-auto text-black w-full">
        <Table>
          <TableBody className="divide-y">{users}</TableBody>
        </Table>
      </div>

      <h1 className="text-4xl font-bold text-center text-gray-800 pt-2 mb-3">
        Config
      </h1>
      <table className="ml-2 border">
        <tbody>{configDiv}</tbody>
      </table>
    </div>
  );
}
