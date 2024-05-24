import React from 'react';
import { Button, Textarea } from "flowbite-react";
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export default function PostForm() {
    const addPost = async (formData: FormData) => {
        "use server"

        let content = formData.get("textbox") as string
        await prisma.post.create({
            data: {
                authorID: 1,
                content: content,
            }
        })

        revalidatePath("/")
    }
    return (
        <form action={addPost} className="flex w-full m-3 ">
            <Textarea name="textbox" maxLength={400} id="comment" placeholder="Say something nice bout someone" required rows={2} />
            <Button type="submit">Submit</Button>
        </form>
    );
}
