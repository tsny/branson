import { PrismaClient } from "@prisma/client"
import Post from "./post"

const prisma = new PrismaClient()

export default async function PostList() {
    let posts: any[] = []
    try {
        const posts = await prisma.post.findMany()
    } catch (e) {
        return <>get posts err</>
    }

    console.log(posts)
    return (
        <>
            {posts.map((post) => (
                <Post
                    user={{
                        username: "",
                        firstName: "",
                        lastName: "",
                        profilePicURL: "",
                    }}
                    boins={post.boins}
                    postText={post.content}
                    hoursSincePost={post.hoursSincePost}
                    onUpBoinsClick={() => { return true }}
                ></Post>
            ))}
        </>
    )

}