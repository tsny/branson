"use client";

import { Button } from "flowbite-react";
import React, { useState } from "react";
import BusinessCard from "./BusinessCard";

interface NewBusinessCardProps {
  usernames: string[];
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
          allUsers={props.usernames}
        ></BusinessCard>
      )}
    </div>
  );
}
