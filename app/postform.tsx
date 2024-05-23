import React from 'react';
import { Button, Label, Textarea } from "flowbite-react";
import prisma from '@/lib/prisma';

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
    }
    return (
        <form action={addPost} className="m-3 max-w-md">
            <Textarea name="textbox" maxLength={400} id="comment" placeholder="Say something nice bout someone" required rows={4} />
            <Button className="mt-2" type="submit">Submit</Button>
        </form>
    );
}
