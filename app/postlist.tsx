import prisma from "@/lib/prisma";
import Post from "./post";

export const dynamic = "force-dynamic";

export default async function PostList() {
  try {
    let posts = await prisma.post.findMany({
      orderBy: [{ id: "desc" }],
      include: {
        author: true,
      },
    });

    return (
      <div className="grid justify-items-center">
        {posts.map((post) => (
          <Post
            key={post.id}
            author={{
              username: post.author.firstName
                ? post.author.firstName
                : "unknown user",
              profilePicURL: "",
              id: post.authorID,
            }}
            boins={post.likes}
            postText={post.content ? post.content : "na"}
            postID={post.id}
            createdTime={post.createdAt.toLocaleString()}
          ></Post>
        ))}
      </div>
    );
  } catch (e) {
    if (typeof e === "string") {
      return <>{e}</>;
    } else if (e instanceof Error) {
      return <>{e.message}</>;
    }
    return <>get posts err</>;
  }
}
