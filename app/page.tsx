"use client";

import { useState } from "react";
import BFooter from "./footer";
import BNavbar from "./navbar";
import UpBoins, { User } from "./upboin";
import Post from "./upboin";

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

export default function Home() {

  const [boins, setBoins] = useState(100);
  let upBoinOnClick = () => setBoins(boins - 1)

  return (
    <div className="h-full w-full">
      <BNavbar></BNavbar>
      <main className="w-full h-full pt-3 flex-col items-center justify-between">
        <Post
          user={leslie}
          boins={13}
          postText="I wanna apologize for what I said earlier"
          hoursSincePost={14}
          onUpBoinsClicked={upBoinOnClick}
        ></Post>
        <Post
          user={leslie}
          boins={13}
          postText="heehehehehehehehe"
          hoursSincePost={14}
          onUpBoinsClicked={upBoinOnClick}
        ></Post>
        <Post
          user={leslie}
          boins={13}
          postText="I wanna apologize for what I said earlier"
          hoursSincePost={14}
          onUpBoinsClicked={upBoinOnClick}
        ></Post>
        <Post
          user={leslie}
          boins={13}
          postText="I wanna apologize for what I said earlier"
          hoursSincePost={14}
          onUpBoinsClicked={upBoinOnClick}
        ></Post>
        <Post
          user={andy}
          boins={2}
          postText="the shop will be closed thursday due to me being sad and tired"
          hoursSincePost={14}
          onUpBoinsClicked={upBoinOnClick}
        ></Post>
        <Post
          user={ashley}
          boins={1}
          postText="has anyone seen my bible"
          hoursSincePost={14}
          onUpBoinsClicked={upBoinOnClick}
        ></Post>
        <Post
          user={leslie}
          boins={1209}
          postText="I think that the left has gone too far sometimes"
          hoursSincePost={14}
          onUpBoinsClicked={upBoinOnClick}
        ></Post>
        <BFooter boins={boins}></BFooter>
      </main>
    </div>
  );
}
