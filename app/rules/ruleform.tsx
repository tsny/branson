import React from 'react';
import { Button, Textarea } from "flowbite-react";
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export default function RuleForm() {
    const addRule = async (formData: FormData) => {
        "use server"

        let content = formData.get("textbox") as string
        await prisma.rule.create({
            data: {
                authorID: 1,
                content: content,
            }
        })

        revalidatePath("/rules")
    }
    return (
        <form action={addRule} className="flex p-2 w-full">
            <Textarea name="textbox" maxLength={400} id="comment" placeholder="Enter rule" required rows={1} />
            <Button className="ml-3" type="submit">Submit</Button>
        </form>
    );
}
