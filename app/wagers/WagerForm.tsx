import { Textarea, Button, TextInput, Label } from "flowbite-react";
import { createWager } from "../actions";
import { User } from "@prisma/client";

export interface WagerFormProps {
  users: User[];
}

export default function WagerForm({ users }: WagerFormProps) {
  return (
    <form
      className="p-3 bg-white border-gray-800 border rounded shadow-log"
      action={createWager}
    >
      <div className="text-xl font-bold">Make A Wager</div>
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
            max={1000}
          ></TextInput>
        </div>
        {/* <PersonSelecter label="Select a challenger" users={users} /> */}
      </div>
      <Button className="mt-2" type="submit">
        Submit
      </Button>
    </form>
  );
}
