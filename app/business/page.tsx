import { Button } from "flowbite-react";
import BusinessCard from "./BusinessCard";
import prisma from "@/lib/prisma";
import NewBusinessCard from "./NewBusinessCard";

export default async function Page() {
  const users = await prisma.user.findMany();

  const userList = users.map((u) => u.firstName ?? "badname");

  return (
    <div className="">
      <NewBusinessCard users={userList} />
      <BusinessCard
        users={userList}
        id={1}
        bio="we do stuff"
        header="test"
        businessName="biz1"
      ></BusinessCard>
      <BusinessCard
        id={1}
        bio="yes we do!!"
        header="we can't prove that"
        businessName="bix2"
      ></BusinessCard>
    </div>
  );
}
