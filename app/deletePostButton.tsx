"use client";
import { Button } from "flowbite-react";
import { HiOutlineTrash } from "react-icons/hi";
import { deletePost } from "./actions";

interface DeletePostButtonProps {
  postID: number;
}

export default function DeletePostButton(props: DeletePostButtonProps) {
  return (
    <Button
      onClick={() => {
        deletePost(props.postID);
      }}
      size={"xs"}
      color="failure"
      className="h-10"
    >
      <HiOutlineTrash className="h-6 w-6" />
    </Button>
  );
}
