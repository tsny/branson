import { Card } from "@prisma/client";

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
