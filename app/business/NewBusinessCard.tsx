"use client";

import { Button } from "flowbite-react";
import React, { useState } from "react";
import BusinessCard from "./BusinessCard";
import { User } from "@prisma/client";

interface NewBusinessCardProps {
  users: User[];
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
        <BusinessCard
          editMode={true}
          onCancel={() => setMakingNew(false)}
          allUsers={props.users}
        ></BusinessCard>
      )}
    </div>
  );
}
