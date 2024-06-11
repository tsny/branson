"use client";

import { Button } from "flowbite-react";
import { useRef } from "react";
import { getCurrentDBUser, getSessionUser, upvote } from "./actions";

interface UpBoinsProps {
  postID: number;
  authorID: number;
  disabled: boolean;
  upboins: number;
}

export default function UpBoins(props: UpBoinsProps) {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        let currUser = await getCurrentDBUser();
        if (!currUser || !currUser.email) {
          return;
        }
        await upvote(currUser.id, props.postID);
        ref.current?.reset();
      }}
    >
      <Button
        type="submit"
        gradientDuoTone="tealToLime"
        disabled={props.disabled}
        className="flex items-center justify-between mt-4 hover:text-blue-500 transition duration-200 ease-in-out"
      >
        <div className="flex items-center space-x-1">
          <span>{props.upboins} Upboins</span>
        </div>
      </Button>
    </form>
  );
}
