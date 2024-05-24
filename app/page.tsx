import BFooter from "./footer";
import BNavbar from "./navbar";
import { User } from "./post";
import Post from "./post";
import PostForm from "./postform";
import PostList from "./postlist";

const leslie: User = {
  username: "lsymonds",
  firstName: "Leslie",
  lastName: "S",
  profilePicURL:
    "https://theimprovshop.com/wp-content/uploads/2022/06/Leslie-Symonds-2048x2048.jpg",
};

export const dynamic = "force-dynamic"

export default function Home() {

  const boins = 0;
  let upBoinOnClick = () => {
    if (boins == 0) {
      return false
    }
    // setBoins(boins - 1)
    return true
  }

  return (
    <div className="h-full w-full">
      <BNavbar></BNavbar>
      <main className="w-full h-full pt-3 flex-col items-center justify-between">
        <h1 className="text-4xl font-bold text-center text-gray-800 pt-8 mb-8">Compliment Wall</h1>
        <PostForm></PostForm>
        <PostList></PostList>
        <Post
          user={leslie}
          boins={13}
          postText="I wanna apologize for what I said earlier"
          createdTime="today"
          onUpBoinsClick={upBoinOnClick}
        ></Post>
        <Post
          user={leslie}
          boins={13}
          postText="heehehehehehehehe"
          createdTime="today"
          onUpBoinsClick={upBoinOnClick}
        ></Post>
        <Post
          user={leslie}
          boins={13}
          postText="I wanna apologize for what I said earlier"
          createdTime="today"
          onUpBoinsClick={upBoinOnClick}
        ></Post>
        <Post
          user={leslie}
          boins={13}
          postText="I wanna apologize for what I said earlier"
          createdTime="today"
          onUpBoinsClick={upBoinOnClick}
        ></Post>
        <BFooter boins={boins}></BFooter>
      </main>
    </div>
  );
}
