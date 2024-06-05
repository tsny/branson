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

    return posts.map((post) => <Post key={post.id} postID={post.id}></Post>);
  } catch (e) {
    if (typeof e === "string") {
      return <>{e}</>;
    } else if (e instanceof Error) {
      return <>{e.message}</>;
    }
    return <>get posts err</>;
  }
}
