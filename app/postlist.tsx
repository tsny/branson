import prisma, { getConfigWithDefault } from "@/lib/prisma";
import Post from "./post";

export const dynamic = "force-dynamic";

export default async function PostList() {
  const anonVal = await getConfigWithDefault("compliments.anon", "false");
  const anon = anonVal === "true";

  let posts = await prisma.post.findMany({
    orderBy: [{ id: "desc" }],
    include: {
      author: true,
    },
  });

  return posts.map((post) => (
    <Post key={post.id} anon={anon} post={post}></Post>
  ));
}
