"use client";
import { Button } from "flowbite-react";
import { HiOutlineTrash } from "react-icons/hi";
import { deletePost, deletePostTest } from "./actions";

interface DeletePostButtonProps {
  postID: number;
}

export default function DeletePostButton(props: DeletePostButtonProps) {
  return (
    <form action={deletePostTest}>
      <Button size={"xs"} type="submit" color="failure" className="h-10">
        <HiOutlineTrash className="h-6 w-6" />
        <input hidden readOnly name="id" value={props.postID}></input>
      </Button>
    </form>
  );
}
