"use client";

import React, { useRef } from "react";
import { Button, Textarea } from "flowbite-react";
import { submitPost } from "./actions";

export default function PostForm() {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        await submitPost(formData);
        ref.current?.reset();
      }}
      className="flex justify-center w-full "
    >
      <Textarea
        className="w-3/4"
        name="textbox"
        minLength={3}
        maxLength={400}
        id="comment"
        placeholder="Say something nice bout someone"
        required
        rows={2}
      />
      <Button className="ml-2 h-1/2" type="submit">
        Submit
      </Button>
    </form>
  );
}
