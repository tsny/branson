import prisma from "@/lib/prisma";
import Post from "./post";

export const dynamic = "force-dynamic";

export default async function PostList() {
  let posts = await prisma.post.findMany({
    orderBy: [{ id: "desc" }],
    include: {
      author: true,
    },
  });

  return posts.map((post) => <Post key={post.id} post={post}></Post>);
}
