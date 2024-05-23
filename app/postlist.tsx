import prisma from "@/lib/prisma"
import Post from "./post"

export default async function PostList() {
    let posts: any[] = []
    try {
        posts = await prisma.post.findMany()
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
                    boins={post.likes}
                    postText={post.content}
                    hoursSincePost={1}
                    onUpBoinsClick={() => { return true }}
                ></Post>
            ))}
        </>
    )

}