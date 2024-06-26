"use server";

import { authConfig } from "@/lib/auth";
import { getRandomCard, rarityToDust } from "@/lib/cards";
import prisma, { getConfigAsNumber } from "@/lib/prisma";
import { Cord } from "@/lib/prisma";
import { Card, CardHistory, CardOwnership, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function upvote(postID: number, cost: number) {
  let user = await getCurrentDBUser();
  if (!user) {
    return;
  }
  let postUpdate = await prisma.post.update({
    where: {
      id: postID,
    },
    data: {
      likes: { increment: 1 },
    },
  });
  if (!postUpdate) {
    console.log("err upvoting post");
    return;
  }

  if (cost > 1) {
    await incrementBoin(user.id, -cost);
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      upboinsGiven: {
        increment: 1,
      },
    },
  });

  revalidatePath("/");
}

export async function incrementBoin(userid: number, amt: number) {
  console.log("incrementing %s boins for user %s", amt, userid);
  await prisma.user.update({
    where: {
      id: userid,
    },
    data: {
      boins: {
        increment: amt,
      },
    },
  });
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

  const numPosts = await prisma.post.count({ where: { authorID: author.id } });
  if (numPosts > 100) {
    console.log("user %s has too many posts", author.firstName);
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

function getNumFromForm(formData: FormData, val: string) {
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
  let boins = getNumFromForm(formData, "boins");
  let userID = getNumFromForm(formData, "userid");
  console.log("setting boins: %s %s", boins, userID);
  await setUserBoins(userID, boins);

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function giveAllUsersBoins(formData: FormData) {
  let boins = getNumFromForm(formData, "boins");
  let users = await prisma.user.findMany();
  for (const u of users) {
    await incrementBoin(u.id, boins);
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deletePostTest(formData: FormData) {
  const id = formData.get("id") as string;
  await deletePost(+id);
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

export async function setUserRole(userID: number, role: string) {
  await prisma.user.update({
    data: {
      role: role,
    },
    where: {
      id: userID,
    },
  });
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

  let user = await prisma.user.findFirst({
    where: {
      email: { equals: seshUser.email },
    },
  });
  if (!user) return;

  return getCordsForUser(user.id);
}

export async function sellCards(dust: number, ownershipIDs: number[]) {
  const user = await getCurrentDBUser();
  if (!user) return;
  await prisma.cardOwnership.deleteMany({
    where: {
      id: {
        in: ownershipIDs,
      },
    },
  });

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      dust: {
        increment: dust,
      },
    },
  });
  revalidatePath("/inventory");
}

export async function getCurrentDBUser() {
  let user = await getSessionUser();
  if (!user || !user.email) {
    return null;
  }
  console.log("Current user is %s", user?.email);

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
  const id = getNumFromForm(formData, "cardid");
  if (!id) {
    console.log("couldn't find id in page", id);
    return;
  }

  await prisma.cardOwnership.deleteMany({
    where: {
      cardId: id,
    },
  });
  await prisma.cardHistory.deleteMany({
    where: {
      cardId: id,
    },
  });
  const output = await prisma.card.delete({
    where: {
      id: id,
    },
  });
  console.log("deleted ", output);
  revalidatePath("/");
}

export async function createOrUpdateCard(formData: FormData) {
  const id = getNumFromForm(formData, "cardid");
  const title = formData.get("cardtitle") as string;
  const rarity = formData.get("rarity") as string;
  const type = formData.get("type") as string;
  const desc = formData.get("desc") as string;
  const quote = formData.get("quote") as string;
  const imageURL = formData.get("img") as string;
  const weight = getNumFromForm(formData, "weight");

  let card = await findCardByID(id);

  if (card) {
    console.log("updating %s -- already exists", card.title);
    await prisma.card.update({
      where: {
        id: card.id,
      },
      data: {
        title: title,
        rarity: rarity.toUpperCase(),
        type: type,
        desc: desc,
        quote: quote,
        imageURL: imageURL,
        weight: weight,
      },
    });
  } else {
    await prisma.card.create({
      data: {
        title: title,
        rarity: rarity.toUpperCase(),
        dustValue: rarityToDust(rarity),
        type: type,
        desc: desc,
        quote: quote,
        imageURL: imageURL,
        weight: weight,
      },
    });
  }
  revalidatePath("/");
}

export async function spinTheWheel(maxNum: number) {
  const user = await getCurrentDBUser();
  if (!user) {
    return;
  }
  const randomNumber = Math.floor(Math.random() * maxNum) + 1;
  console.log("%s spun a %s", user.id, randomNumber);
  await prisma.user.update({
    data: {
      boins: { increment: randomNumber },
      lastSpin: new Date(),
      spins: { increment: 1 },
    },
    where: {
      id: user.id,
    },
  });

  await prisma.wheelEvent.create({
    data: {
      amt: randomNumber,
      userId: user.id,
    },
  });
  revalidatePath("/");
}

export async function resetPlayer(userid: number) {
  await prisma.cardHistory.deleteMany({
    where: { userId: userid },
  });
  await prisma.cardOwnership.deleteMany({
    where: { userId: userid },
  });
  await prisma.user.update({
    where: { id: userid },
    data: { dust: 100 },
  });
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

export async function convertDustToPack() {
  let user = await getCurrentDBUser();
  if (!user) return;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      dust: { increment: -100 },
      boins: { increment: 1 },
    },
  });
  revalidatePath("/");
}

export async function buyPack() {
  let user = await getCurrentDBUser();
  if (!user || user.boins < 1) {
    revalidatePath("/");
    return;
  }
  await prisma.user.update({
    where: { id: user.id },
    data: {
      boins: user.boins - 1,
      numPacks: user.numPacks + 1,
    },
  });
  revalidatePath("/inventory/store");
}

export async function unwrapPack() {
  const user = await getCurrentDBUser();
  if (!user || user.numPacks <= 0) {
    revalidatePath("/inventory/store");
    return;
  }
  let allCards: Card[] = await prisma.card.findMany();

  const numCards = 3;
  for (let index = 0; index < numCards; index++) {
    let card = getRandomCard(allCards);
    await prisma.cardOwnership.create({
      data: {
        cardId: card.id,
        isFoil: false,
        userId: user.id,
      },
    });
    await prisma.cardEvent.create({
      data: {
        cardId: card.id,
        userId: user.id,
      },
    });
    console.log("%s unwrapped %s", user.firstName, card.title);
    await upsertCardHistory(card.id, user.id);
  }
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      packsOpened: { increment: 1 },
      numPacks: { increment: -1 },
    },
  });
  revalidatePath("/inventory/store");
}

async function upsertCardHistory(cardID: number, userID: number) {
  const cardHistory = await prisma.cardHistory.findFirst({
    where: {
      userId: userID,
      cardId: cardID,
    },
  });
  if (cardHistory) {
    return;
  }

  await prisma.cardHistory.create({
    data: {
      action: "SEEN",
      cardId: cardID,
      userId: userID,
    },
  });
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

export async function getCardHistory(userid: number): Promise<CardHistory[]> {
  return await prisma.cardHistory.findMany({
    where: {
      userId: userid,
    },
    include: {
      card: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}

export async function getKnownCards(userid: number): Promise<Card[]> {
  const cards = await prisma.cardHistory.findMany({
    where: {
      userId: userid,
    },
    include: {
      card: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  return cards.map((c) => c.card);
}

export async function getCordsForUser(userid: number): Promise<Cord[]> {
  return await prisma.cardOwnership.findMany({
    where: {
      userId: userid,
    },
    include: {
      card: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}
