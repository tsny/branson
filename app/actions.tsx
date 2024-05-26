"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitPost(formData: FormData) {
  let content = formData.get("textbox") as string;
  await prisma.post.create({
    data: {
      authorID: 1,
      content: content,
    },
  });

  revalidatePath("/");
}

export async function deletePost(postID: number) {
  await prisma.post.delete({
    where: {
      id: postID,
    },
  });
  console.log("deleted post " + postID);
  revalidatePath("/");
}

export async function deleteRule(ruleID: number) {
  await prisma.rule.delete({
    where: {
      id: ruleID,
    },
  });
  console.log("deleted rule " + ruleID);
  revalidatePath("/rules");
}
