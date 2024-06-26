"use client";

import { Button } from "flowbite-react";
import { useRef, useState } from "react";
import { upvote } from "./actions";

interface UpBoinsProps {
  postID: number;
  authorID: number;
  disabled: boolean;
  upboins: number;
  cost: number;
}

export default function UpBoins(props: UpBoinsProps) {
  let [votes, setVotes] = useState(props.upboins);
  return (
    <form
      action={async (formData) => {
        await upvote(props.postID, props.cost);
      }}
    >
      <Button
        type="submit"
        gradientDuoTone="tealToLime"
        disabled={props.disabled}
        className="mt-4 hover:text-blue-500 transition duration-200 ease-in-out"
        onClick={() => setVotes(votes + 1)}
      >
        <span>{votes} Upboins</span>
      </Button>
    </form>
  );
}
