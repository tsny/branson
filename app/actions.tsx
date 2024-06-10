"use server";

import { authConfig } from "@/lib/auth";
import { getRandomCard } from "@/lib/cards";
import prisma from "@/lib/prisma";
import { Card, CardOwnership, User } from "@prisma/client";
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

function getIntFromFormdata(formData: FormData, val: string) {
  const str = formData.get(val) as string;
  let numBoins = +str;
  if (numBoins <= 0) {
    numBoins = 1;
  }
  return numBoins;
}

export async function setUserBoins(id: number, boins: number) {
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      boins: boins,
    },
  });
}

export async function setUserBoinsFromForm(formData: FormData) {
  let boins = getIntFromFormdata(formData, "boins");
  let userID = getIntFromFormdata(formData, "userid");
  await setUserBoins(userID, boins);

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function giveAllUsersBoins(formData: FormData) {
  let boins = getIntFromFormdata(formData, "boins");
  let users = await prisma.user.findMany();
  for (const u of users) {
    await prisma.user.update({
      where: {
        id: u.id,
      },
      data: {
        boins: u.boins + boins,
      },
    });
  }
  revalidatePath("/");
  revalidatePath("/admin");
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

export async function createRule(formData: FormData) {
  let content = formData.get("ruleText") as string;
  let author = formData.get("author") as string;
  let fine = formData.get("fine") as string;
  let fineAmount: number = +fine;
  if (fineAmount < 1) {
    fineAmount = 1;
  }
  let user = await getCurrentDBUser();
  if (!user) {
    return;
  }
  await prisma.rule.create({
    data: {
      content: content,
      fine: fineAmount,
      authorName: author,
    },
  });

  revalidatePath("/rules");
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

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentDBUser();
  if (!user) {
    return false;
  }
  const role = user.role?.toLowerCase();
  return role == "admin" || role == "super";
}

export async function isUserSuperAdmin(): Promise<boolean> {
  const user = await getCurrentDBUser();
  if (!user) {
    return false;
  }
  return user.role?.toLowerCase() == "super";
}

export async function getSessionUser() {
  const session = await getServerSession(authConfig);
  if (session == undefined || session.user == undefined) {
    return;
  }
  return session.user;
}

export async function getCurrentUserCards() {
  let seshUser = await getSessionUser();
  if (!seshUser || !seshUser.email) {
    return null;
  }

  return await prisma.user.findFirst({
    where: {
      email: { equals: seshUser.email },
    },
    include: {
      CardOwnership: true,
    },
  });
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

export async function createOrUpdateCard(formData: FormData) {
  const title = formData.get("cardtitle") as string;
  const rarity = formData.get("rarity") as string;
  const type = formData.get("type") as string;
  const desc = formData.get("desc") as string;
  const quote = formData.get("quote") as string;
  const imageURL = formData.get("img") as string;
  const weight = formData.get("weight") as string;
  let weightNum: number = +weight;

  let card = await prisma.card.findFirst({
    where: {
      title: {
        equals: title,
      },
    },
  });
  if (card) {
    console.log("card already exists");
    await prisma.card.update({
      where: {
        id: card.id,
      },
      data: {
        title: title,
        rarity: rarity,
        type: type,
        desc: desc,
        quote: quote,
        imageURL: imageURL,
        weight: weightNum,
      },
    });
  } else {
    await prisma.card.create({
      data: {
        title: title,
        rarity: rarity,
        type: type,
        desc: desc,
        quote: quote,
        imageURL: imageURL,
      },
    });
  }
  revalidatePath("/");
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

export async function buyPackFromForm(formData: FormData) {
  const userid = Number(formData.get("userid"));
  return buyPack(userid);
}

export async function buyPack(userid: number) {
  const user = await findUserByID(userid);
  if (!user) {
    return;
  }
  if (user.boins < 1) {
    return;
  }
  await prisma.user.update({
    where: { id: user.id },
    data: {
      boins: user.boins - 1,
      numPacks: user.numPacks + 1,
    },
  });
  revalidatePath("/");
  revalidatePath("/inventory");
}

export async function unwrapPack2(userid: number) {
  const user = await findUserByID(userid);
  if (!user) {
    return;
  }
  let cards: Card[] = await prisma.card.findMany();
  let outputCards: CardOwnership[] = [];
  for (let index = 0; index < 3; index++) {
    let card = getRandomCard(cards);
    const ownership = await prisma.cardOwnership.create({
      data: {
        cardId: card.id,
        isFoil: false,
        userId: user.id,
      },
    });
    outputCards.push(ownership);
  }
  return outputCards;
}

export async function unwrapPack() {
  let cards: Card[] = await prisma.card.findMany();
  let outputCards: Card[] = [];
  for (let index = 0; index < 3; index++) {
    let card = getRandomCard(cards);
    outputCards.push(card);
  }
  return outputCards;
}

export interface CardStats {
  id: number;
  title: string;
  chance: number;
  card: Card;
}

export async function getCardChances(): Promise<CardStats[]> {
  let cards: Card[] = await prisma.card.findMany({
    orderBy: { weight: "desc" },
  });
  const totalWeight = cards.reduce((sum, card) => sum + card.weight, 0);
  return cards.map((card) => ({
    title: card.title,
    chance: +((card.weight / totalWeight) * 100).toFixed(2),
    id: card.id,
    card: card,
  }));
}
