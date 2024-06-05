import { Avatar, Button } from "flowbite-react";
import React from "react";
import DeletePostButton from "./deletePostButton";
import UpBoins from "./upboin";
import { getCurrentDBUser, findPostByID } from "./actions";

export interface PostProps {
  postID: number;
}

export default async function Post(props: PostProps) {
  let post = await findPostByID(props.postID);
  if (!post) {
    return <div>post {props.postID} not found</div>;
  }

  let dbUser = await getCurrentDBUser();

  const upBoins = post ? post.likes : 0;
  const userOwnsPost = dbUser && dbUser.id == post.author.id ? true : false;
  const avatarURL = post.author?.profilePicURL ? post.author.profilePicURL : "";

  return (
    <div className="w-11/12 bg-white border-black-300 rounded-lg shadow-md p-2 m-2">
      <div className="flex items-start">
        <Avatar img={avatarURL} />
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500">
                @{post.author.firstName}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                {post.createdAt?.toLocaleString()}
              </span>
            </div>
          </div>
          <p className="mt-2 text-gray-800">{post.content}</p>

          <div className="flex justify-between">
            <UpBoins
              disabled={userOwnsPost}
              authorID={post.author.id}
              postID={props.postID}
              upboins={upBoins}
            ></UpBoins>
            {userOwnsPost && (
              <DeletePostButton postID={props.postID}></DeletePostButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
