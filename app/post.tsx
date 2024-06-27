import { Avatar } from "flowbite-react";
import React, { ReactNode } from "react";
import DeletePostButton from "./deletePostButton";
import UpBoins from "./upboin";
import { isUserSuperAdmin } from "./actions";
import { PostExt } from "@/lib/prisma";
import { User } from "@prisma/client";
import { HiStar } from "react-icons/hi";

export interface PostProps {
  post: PostExt;
  anon?: boolean;
  user?: User | null;
  upvoteCost?: number;
}

export default async function Post(props: PostProps) {
  const post = props.post;
  const user = props.user;
  const cost = props.upvoteCost ?? 0;

  const userOwnsPost = user ? user.id == post.author.id : false;
  const canDeletePost = userOwnsPost || (await isUserSuperAdmin());

  const userHasEnoughBoins = user ? user.boins > cost : false;
  const disableUpvoteButton = userOwnsPost || !userHasEnoughBoins;

  let avatarURL = post.author?.profilePicURL ? post.author.profilePicURL : "";
  const anon = props.anon;
  let username = props.post.author.firstName;
  if (anon) {
    avatarURL = "";
    username = "anonymous";
  }

  let star: ReactNode[] = [];
  const stars = Math.floor(post.likes / 30);
  for (let index = 0; index < stars; index++) {
    star.push(<HiStar key={index} className="inline" />);
  }

  return (
    <div
      className={"bg-white border-gray-300 border-2 rounded-lg shadow-md p-2"}
    >
      <div className="flex items-start">
        <Avatar img={avatarURL} />
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500">@{username}</span>
              <span className="text-xs text-gray-500 ml-2 pr-3">
                {post.createdAt?.toLocaleString()}
              </span>
              {star}
            </div>
          </div>
          <p className="mt-2 text-gray-800 text-sm">{post.content}</p>

          <div className="flex justify-between">
            <UpBoins
              disabled={disableUpvoteButton}
              authorID={post.author.id}
              postID={post.id}
              votes={post.likes}
              cost={cost}
            ></UpBoins>
            {canDeletePost && (
              <div className="mt-3">
                <DeletePostButton postID={post.id}></DeletePostButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
