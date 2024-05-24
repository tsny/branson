import prisma from "@/lib/prisma"
import { Button, Card } from "flowbite-react";


export default async function RuleList() {
    let rules: any[]
    try {
        rules = await prisma.rule.findMany({
            orderBy: [{ id: 'desc' }],
        })
    } catch (e) {
        if (typeof e === "string") {
            return <>{e}</>
        } else if (e instanceof Error) {
            return <>{e.message}</>
        }
        return <>get err</>
    }

    return (
        <>
            {rules.map((rule) => (
                <>
                    <Card href="#" className="w-3/4 mb-2">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {rule.content}
                        </h5>
                        <div className="flex justify-between">
                            <p className="tracking-tight text-gray-900 dark:text-white">
                                Fine: {rule.fine}
                            </p>
                            <Button>Delete</Button>
                        </div>
                    </Card>
                </>
                // <Rule key={post.id}
                //     user={{
                //         username: post.id,
                //         firstName: post?.author?.id,
                //         lastName: "",
                //         profilePicURL: "https://icons.iconarchive.com/icons/iconarchive/fish-illustration/256/Small-3-Tiny-Fish-icon.png",
                //     }}
                //     boins={post.likes}
                //     postText={post.content}
                //     createdTime={post.createdAt.toString()}
                //     onUpBoinsClick={() => { return true }}
                // ></Post>
            ))}
        </>
    )

}
