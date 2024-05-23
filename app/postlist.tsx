import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function PostList() {
    const posts = await prisma.post.findMany()

    console.log(posts)
    return (
        <>
            <ul>
                {
                    posts.map((post) => (
                        <p>{post.content}</p>
                    ))}
            </ul>
        </>
    )

}