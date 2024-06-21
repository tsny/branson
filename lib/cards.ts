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

export function rarityToDust(rarity: string): number {
  switch (rarity.toLowerCase()) {
    case "common":
      return 10;
    case "rare":
      return 30;
    case "epic":
      return 50;
    case "legendary":
      return 100;
    default:
      return 10;
  }
}

export function getMinutes(date1: Date, date2: Date): number {
  const differenceInMillis = date1.getTime() - date2.getTime();
  if (differenceInMillis <= 0) {
    return 0;
  }
  const minutesDifference = Math.floor(differenceInMillis / (1000 * 60));
  return minutesDifference;
}
