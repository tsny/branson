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

  let user = await findUserByID(upvoterUserID);
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

export async function findPostByID(id: number) {
  return await prisma.post.findFirst({
    where: {
      id: id,
    },
    include: {
      author: true,
    },
  });
}

export async function findUserByID(id: number) {
  return await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
}

export async function findUserByEmail(email: string) {
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

export async function isUserSuperAdmin(): Promise<boolean> {
  const user = await getSessionUser();
  if (!user) {
    return false;
  }
  return user.email === "tsny700@gmail.com";
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

  return await findUserByEmail(user.email);
}

export async function findCardByID(id: number) {
  return await prisma.card.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });
}

export async function deleteCard(formData: FormData) {
  const id = formData.get("button") as string;
  const idNumber: number = +id;
  if (!idNumber) {
    console.log("couldn't find id in page", id);
    return;
  }
  const output = await prisma.card.delete({
    where: {
      id: idNumber,
    },
  });
  console.log("deleted ", output);
  revalidatePath("/");
}

export async function createNewCard(formData: FormData) {
  const title = formData.get("cardtitle") as string;
  const rarity = formData.get("rarity") as string;
  const type = formData.get("type") as string;
  const desc = formData.get("desc") as string;
  const quote = formData.get("quote") as string;
  const imageURL = formData.get("img") as string;

  let card = await prisma.card.findFirst({
    where: {
      title: {
        equals: title,
      },
    },
  });
  if (card) {
    console.log("card already exists");
    return;
  }
  let response = await prisma.card.create({
    data: {
      title: title,
      rarity: rarity,
      type: type,
      desc: desc,
      quote: quote,
      imageURL: imageURL,
    },
  });
  revalidatePath("/");
  return response;
}

export async function createNewDBUser(
  email: string,
  name: string,
  profilePicURL: string | null | undefined
) {
  let newUser = await prisma.user.create({
    data: {
      email: email,
      firstName: name,
      boins: 5,
      profilePicURL: profilePicURL,
    },
  });
  console.log("new user! ", newUser);
}
