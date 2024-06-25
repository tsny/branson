"use client";

import React, { useRef } from "react";
import { Button, Card, Textarea } from "flowbite-react";
import { submitPost } from "./actions";

export default function PostForm() {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <Card className="w-11/12 self-auto">
      <form
        ref={ref}
        action={async (formData) => {
          await submitPost(formData);
          ref.current?.reset();
        }}
        className="flex justify-center w-full "
      >
        <Textarea
          className="w-3/4 resize-none"
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
    </Card>
  );
}
