import Post, { User } from "@/app/post";

export const leslie: User = {
    username: "lsymonds",
    firstName: "Leslie",
    lastName: "S",
    profilePicURL:
      "https://theimprovshop.com/wp-content/uploads/2022/06/Leslie-Symonds-2048x2048.jpg",
  };


export default function DummpyPosts() {
    let boins = 0
    let upBoinOnClick = () => {
        if (boins == 0) {
          return false
        }
        // setBoins(boins - 1)
        return true
      }
    return(
        <div>

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
      </div>
    )
}