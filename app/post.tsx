"use server";

import { Avatar, Button } from "flowbite-react";
import React from "react";
import DeletePostButton from "./deletePostButton";
import UpBoins from "./upboin";
import { getCurrentDBUser } from "./actions";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface User {
  id: number;
  username: string;
  firstName?: string;
  profilePicURL: string;
}

export interface PostProps {
  author: User;
  postText: string;
  postID: number;
  boins: number;
  createdTime: string;
}

export default async function Post(props: PostProps) {
  let dbUser = await getCurrentDBUser();
  let upBoinBtnDisabled = dbUser ? false : true;
  if (dbUser && dbUser.boins <= 0) {
    upBoinBtnDisabled = true;
  }
  if (dbUser && dbUser.id == props.author.id) {
    upBoinBtnDisabled = true;
  }

  let post = await prisma.post.findFirst({
    where: {
      id: props.postID,
    },
  });
  if (!post) {
    return <div>post {props.postID} not found</div>;
  }
  const upBoins = post ? post.likes : 0;

  return (
    <div className="w-11/12 bg-white border-black-300 rounded-lg shadow-md p-2 m-2">
      <div className="flex items-start">
        <Avatar img={props.author.profilePicURL} />
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500">
                @{props.author.username}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                {props.createdTime}
              </span>
            </div>
          </div>
          <p className="mt-2 text-gray-800">{props.postText}</p>

          <div className="flex justify-between">
            <UpBoins
              disabled={upBoinBtnDisabled}
              authorID={props.author.id}
              postID={props.postID}
              upboins={upBoins}
            ></UpBoins>
            {dbUser && dbUser.id == props.author.id && (
              <DeletePostButton postID={props.postID}></DeletePostButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
