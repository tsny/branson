import BusinessCard from "./BusinessCard";
import prisma from "@/lib/prisma";
import NewBusinessCard from "./NewBusinessCard";
import { getCurrentDBUser } from "../actions";

export default async function Page() {
  const allUsers = await prisma.user.findMany();
  const currUser = await getCurrentDBUser();

  const businesses = await prisma.business.findMany();
  const businessList = businesses.map((b, i) => {
    let canEdit = false;
    if (currUser?.firstName) {
      canEdit =
        b.founderUserID == currUser?.id ||
        b.members.includes(currUser.firstName);
    }
    return (
      <BusinessCard canEdit={canEdit} allUsers={allUsers} key={i} biz={b} />
    );
  });

  return (
    <div className="">
      {currUser && <NewBusinessCard users={allUsers} />}
      {businessList}
    </div>
  );
}
