"use client";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import BusinessCard from "./BusinessCard";
import { User } from "@prisma/client";

interface NewBusinessCardProps {
  users: string[];
}

export default function NewBusinessCard(props: NewBusinessCardProps) {
  let [makingNew, setMakingNew] = useState(false);

  return (
    <div>
      {!makingNew && (
        <Button
          className="m-2"
          size={"xl"}
          color={"purple"}
          onClick={() => setMakingNew(true)}
        >
          + New Business
        </Button>
      )}
      {makingNew && (
        <div>
          <BusinessCard
            businessName="New Biz"
            header="Header here"
            bio="Bio Here"
            editMode={true}
            onCancel={() => setMakingNew(false)}
            users={props.users}
          ></BusinessCard>
        </div>
      )}
    </div>
  );
}
