import { Textarea, Button, TextInput, Label } from "flowbite-react";
import { createWager } from "../actions";
import PersonSelecter from "@/lib/PersonSelecter";
import { User } from "@prisma/client";

export interface WagerFormProps {
  users: User[];
}

export default function WagerForm({ users }: WagerFormProps) {
  return (
    <form action={createWager}>
      <Label>Criteria</Label>
      <Textarea
        required
        placeholder="Bet criteria goes here"
        name="desc"
      ></Textarea>
      <div className="flex justify-center gap-2">
        <div>
          <Label>Bet Amount</Label>
          <TextInput
            defaultValue={10}
            type="number"
            name="bet"
            required
            min={1}
          ></TextInput>
        </div>
        <PersonSelecter label="Select a challenger" users={users} />
      </div>
      <Button className="mt-2" type="submit">
        Submit
      </Button>
    </form>
  );
}
