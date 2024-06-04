"use server";

import { authConfig } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function upvote(
  upvoterUserID: number,
  postID: number,
  currentBoins: number
) {
  console.log(upvoterUserID);
  let postUpdate = await prisma.post.update({
    where: {
      id: postID,
    },
    data: {
      likes: currentBoins + 1,
    },
  });
  if (!postUpdate) {
    console.log("err upvoting post");
    return;
  }

  let user = await getUserByID(upvoterUserID);
  if (!user) {
    console.log("err getting upvoter user", upvoterUserID);
    return;
  }

  await prisma.user.update({
    where: {
      id: upvoterUserID,
    },
    data: {
      boins: user.boins - 1,
    },
  });

  revalidatePath("/");
}

export async function getUserByID(id: number) {
  return await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email: { equals: email },
    },
  });
}

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

export async function getSessionUser() {
  const session = await getServerSession(authConfig);
  if (session == undefined || session.user == undefined) {
    return;
  }
  return session.user;
}

export async function getCurrentDBUser() {
  let user = await getSessionUser();
  if (!user || !user.email) {
    return null;
  }

  return await prisma.user.findFirst({
    where: {
      email: {
        equals: user.email,
      },
    },
  });
}

export async function createNewDBUser(email: string, name: string) {
  let newUser = await prisma.user.create({
    data: {
      email: email,
      firstName: name,
      boins: 5,
    },
  });
  console.log("new user! ", newUser);
}
