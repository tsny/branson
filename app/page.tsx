"use client";

import BNavbar from "./navbar";
import UpBoins from "./upboin";

interface User {
  username: string;
  firstName: string;
  lastName: string;
  profilePicURL: string;
}

interface PostProps {
  user: User;
  postText: string;
  likes: Number;
  hoursSincePost: Number;
}

const leslie: User = {
  username: "lsymonds",
  firstName: "Leslie",
  lastName: "S",
  profilePicURL:
    "https://theimprovshop.com/wp-content/uploads/2022/06/Leslie-Symonds-2048x2048.jpg",
};
const andy: User = {
  username: "asloey",
  firstName: "Andy",
  lastName: "S",
  profilePicURL:
    "https://theimprovshop.com/wp-content/uploads/2018/09/andy.jpg",
};
const ashley: User = {
  username: "arube",
  firstName: "Ashley",
  lastName: "S",
  profilePicURL:
    "https://theimprovshop.com/wp-content/uploads/2022/06/Ashley.jpg",
};

function Post(props: PostProps) {
  return (
    <div className="w-full bg-white bordeBr border-gray-300 rounded-lg shadow-md p-2 m-2">
      <div className="flex items-start">
        <img
          src={props.user.profilePicURL}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-gray-800">
                {props.user.firstName}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                @{props.user.username}
              </span>
              <span className="text-sm text-gray-500 ml-2">· {props.hoursSincePost.toString()}h</span>
            </div>
          </div>
          <p className="mt-2 text-gray-800">{props.postText}</p>
          <UpBoins></UpBoins>
        </div>
      </div>
    </div>
  );
}

function randHours() {
  return Math.floor(Math.random() * (20 - 1 + 1)) + 1;
}

export default function Home() {
  let boins = 100;
  return (
    <div className="h-full w-full">
      <BNavbar></BNavbar>
      <main className="w-full h-full pt-5 flex-col items-center justify-between">
        <Post
          user={leslie}
          likes={13}
          postText="I wanna apologize for what I said earlier"
          hoursSincePost={randHours()}
        ></Post>
        <Post
          user={leslie}
          likes={13}
          postText="I wanna apologize for what I said earlier"
          hoursSincePost={randHours()}
        ></Post>
        <Post
          user={leslie}
          likes={13}
          postText="I wanna apologize for what I said earlier"
          hoursSincePost={randHours()}
        ></Post>
        <Post
          user={leslie}
          likes={13}
          postText="I wanna apologize for what I said earlier"
          hoursSincePost={randHours()}
        ></Post>
        <Post
          user={andy}
          likes={2}
          postText="the shop will be closed thursday due to me being sad and tired"
          hoursSincePost={randHours()}
        ></Post>
        <Post
          user={ashley}
          likes={1}
          postText="has anyone seen my bible"
          hoursSincePost={randHours()}
        ></Post>
        <Post
          user={leslie}
          likes={1209}
          postText="I think that the left has gone too far sometimes"
          hoursSincePost={randHours()}
        ></Post>

        <footer className="mt-40 bg-white rounded-lg shadow m-4 dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <p className="text-sm text-center text-gray-500">
              You have {boins} Bitboins
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
