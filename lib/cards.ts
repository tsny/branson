import { Card, Prisma } from "@prisma/client";

export function getRandomCard(cards: Card[]): Card {
  const totalWeight = cards.reduce((sum, card) => sum + card.weight, 0);
  let random = Math.random() * totalWeight;

  for (const card of cards) {
    if (random < card.weight) {
      return card;
    }
    random -= card.weight;
  }

  return cards[cards.length - 1];
}

// 1: Define a type that includes the relation to `Post`
// const userWithPosts = Prisma.validator<Prisma.UserDefaultArgs>()({
//   include: { posts: true },
// });

// 2: Define a type that only contains a subset of the scalar fields
const userPersonalData = Prisma.validator<Prisma.CardOwnershipDefaultArgs>()({
  include: { card: true },
});

// 3: This type will include a user and all their posts
export type Cord = Prisma.CardOwnershipGetPayload<typeof userPersonalData>;
