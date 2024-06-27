import prisma, { getConfigAsNumber, getConfigWithDefault } from "@/lib/prisma";
import Post from "./post";
import { getCurrentDBUser } from "./actions";

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

  const postList = posts.map((post) => (
    <Post
      key={post.id}
      user={user}
      upvoteCost={voteCost}
      anon={anon}
      post={post}
    ></Post>
  ));

  return <div className="w-full p-2 grid grid-cols-1 gap-y-4">{postList}</div>;
}
