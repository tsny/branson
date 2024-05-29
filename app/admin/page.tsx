import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import BNavbar from "../navbar";
import { Card } from "flowbite-react";
import prisma from "@/lib/prisma";
import { getSessionUser } from "../actions";

export default async function Page() {
  let user = await getSessionUser();

  let users = (await prisma.user.findMany()).map((u) => (
    <div key={u.id}>
      {u.id} -- {u.email} -- {u.firstName} -- {u.boins} boins
    </div>
  ));

  return (
    <div>
      <BNavbar></BNavbar>
      <main className="w-full h-full pt-3 flex-col items-center justify-between">
        <Card className="text-black">You are {user?.email}</Card>
        <Card className="text-black">
          <h1 className="text-2xl font-bold">Users</h1>
          {users}
        </Card>
      </main>
    </div>
  );
}
