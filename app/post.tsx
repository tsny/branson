import { Avatar, Button } from "flowbite-react";
import React from "react";
import DeletePostButton from "./deletePostButton";
import UpBoins from "./upboin";
import { getCurrentDBUser, findPostByID, isUserSuperAdmin } from "./actions";
import { Post as BPost } from "@prisma/client";
import { PostExt } from "@/lib/prisma";

export interface PostProps {
  post: PostExt;
  anon?: boolean;
}

export default async function Post(props: PostProps) {
  let dbUser = await getCurrentDBUser();

  const post = props.post;
  const userHasNoBoins = dbUser?.boins ? false : true;

  const userOwnsPost = dbUser && dbUser.id == post.author.id ? true : false;
  const canDeletePost = (await isUserSuperAdmin()) || userOwnsPost;
  let avatarURL = post.author?.profilePicURL ? post.author.profilePicURL : "";
  const anon = props.anon;
  let username = props.post.author.firstName;
  if (props.anon) {
    avatarURL = "";
    username = "anonymous";
  }

  return (
    <div className="w-11/12 bg-white border-black-300 rounded-lg shadow-md p-2 m-2">
      <div className="flex items-start">
        <Avatar img={avatarURL} />
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500">@{username}</span>
              <span className="text-xs text-gray-500 ml-2">
                {post.createdAt?.toLocaleString()}
              </span>
            </div>
          </div>
          <p className="mt-2 text-gray-800 text-sm">{post.content}</p>

          <div className="flex justify-between">
            <UpBoins
              disabled={userOwnsPost || userHasNoBoins}
              authorID={post.author.id}
              postID={post.id}
              upboins={post.likes}
            ></UpBoins>
            {canDeletePost && (
              <DeletePostButton postID={post.id}></DeletePostButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
