import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import BNavbar from "../navbar";
import { Card } from "flowbite-react";
import prisma from "@/lib/prisma";

export default async function Page() {
  const session = await getServerSession(authConfig).then();
  if (session == undefined || session.user == undefined) {
    return;
  }

  let users = (await prisma.user.findMany()).map((u) => (
    <div key={u.id}>
      {u.email} -- {u.firstName}
    </div>
  ));

  return (
    <div>
      <BNavbar></BNavbar>
      <main className="w-full h-full pt-3 flex-col items-center justify-between">
        <Card className="text-black">You are {session?.user.email}</Card>
        <Card className="text-black">
          <h1 className="text-2xl font-bold">Users</h1>
          {users}
        </Card>
      </main>
    </div>
  );
}
