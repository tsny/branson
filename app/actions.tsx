"use server";

import { authConfig } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function submitPost(formData: FormData) {
  let content = formData.get("textbox") as string;

  const session = await getServerSession(authConfig);
  if (session === undefined || session?.user === undefined) {
    return;
  }
  let email = session.user.email?.toString();

  let author = await prisma.user.findFirst({
    where: {
      email: { equals: email },
    },
  });

  if (author == null) {
    console.log("author null for " + email);
    return;
  }

  await prisma.post.create({
    data: {
      authorID: author.id,
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
