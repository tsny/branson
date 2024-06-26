import prisma, { getConfigAsNumber, getConfigWithDefault } from "@/lib/prisma";
import Post from "./post";
import { getCurrentDBUser } from "./actions";

export const dynamic = "force-dynamic";

export default async function PostList() {
  const user = await getCurrentDBUser();
  const anonVal = await getConfigWithDefault("compliments.anon", "false");
  const anon = anonVal === "true";
  const voteCost = await getConfigAsNumber("upvote.cost");

  let posts = await prisma.post.findMany({
    orderBy: [{ id: "desc" }],
    include: {
      author: true,
    },
  });

  return posts.map((post) => (
    <Post
      key={post.id}
      user={user}
      upvoteCost={voteCost}
      anon={anon}
      post={post}
    ></Post>
  ));
}
