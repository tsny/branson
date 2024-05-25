import prisma from "@/lib/prisma"
import Post from "./post"

export const dynamic = "force-dynamic"

export default async function PostList() {
    let posts: any[]
    try {
        posts = await prisma.post.findMany({
            orderBy: [{ id: 'desc' }],
        })
    } catch (e) {
        if (typeof e === "string") {
            return <>{e}</>
        } else if (e instanceof Error) {
            return <>{e.message}</>
        }
        return <>get posts err</>
    }

    return (
        <>
            {posts.map((post) => (
                <Post key={post.id}
                    user={{
                        username: post.id,
                        firstName: post?.author?.id,
                        lastName: "",
                        profilePicURL: "",
                    }}
                    boins={post.likes}
                    postText={post.content}
                    createdTime={post.createdAt.toLocaleString()}
                    onUpBoinsClick={() => { return true }}
                ></Post>
            ))}
        </>
    )

}
