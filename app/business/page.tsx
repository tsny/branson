import BusinessCard from "./BusinessCard";
import prisma from "@/lib/prisma";
import NewBusinessCard from "./NewBusinessCard";
import { getCurrentDBUser } from "../actions";

export default async function Page() {
  const allUsers = await prisma.user.findMany();
  const allUserNames = allUsers.map((u) => u.firstName ?? "badname");
  const currUser = await getCurrentDBUser();

  const businesses = await prisma.business.findMany();
  const businessList = businesses.map((b, i) => (
    <BusinessCard
      canEdit={b.founderUserID == currUser?.id}
      allUsers={allUserNames}
      key={i}
      biz={b}
    />
  ));

  return (
    <div className="">
      <NewBusinessCard usernames={allUserNames} />
      {businessList}
    </div>
  );
}
