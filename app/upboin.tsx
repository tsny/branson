"use client";

import { Button } from "flowbite-react";
import { useOptimistic, useRef, useState } from "react";
import { upvote } from "./actions";

interface UpBoinsProps {
  postID: number;
  authorID: number;
  disabled: boolean;
  votes: number;
  cost: number;
}

export default function UpBoins(props: UpBoinsProps) {
  let [votes, addVotes] = useOptimistic(
    props.votes,
    (state, newVote: number) => {
      return state + 1;
    }
  );

  return (
    <form
      action={async (formData) => {
        addVotes(1);
        await upvote(props.postID, props.cost);
      }}
    >
      <Button
        type="submit"
        gradientDuoTone="tealToLime"
        disabled={props.disabled}
        className="mt-4 hover:text-blue-500 transition duration-200 ease-in-out"
      >
        {votes} Upboins
      </Button>
    </form>
  );
}
