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
        console.log(props.postID);
        deletePost(props.postID);
      }}
      color="gray"
      className="w-15 h-15 mr-3"
    >
      <HiOutlineTrash className="h-6 w-6" />
    </Button>
  );
}
