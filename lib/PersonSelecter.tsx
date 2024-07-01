import { User } from "@prisma/client";
import { Label, Select } from "flowbite-react";
import React from "react";

interface PersonSelecterProps {
  users: User[];
  label?: string;
}

export default function PersonSelecter({ label, users }: PersonSelecterProps) {
  const options = users.map((u) => {
    return (
      <option value={u.id} key={u.id}>
        {u.firstName}
      </option>
    );
  });

  label = label ?? "Select a user";

  return (
    <div className="max-w-md">
      <Label value={label} />
      <Select name="userid" required>
        {options}
      </Select>
    </div>
  );
}
