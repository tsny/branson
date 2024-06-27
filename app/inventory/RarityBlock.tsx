import { Card } from "@prisma/client";

interface RarityBlockProps {
  cards: Card[];
}

export function RarityBlock(props: RarityBlockProps) {
  const common = props.cards.filter((c) => c.rarity.toLowerCase() == "common");
  const rare = props.cards.filter((c) => c.rarity.toLowerCase() == "rare");
  const epic = props.cards.filter((c) => c.rarity.toLowerCase() == "epic");
  const legendary = props.cards.filter(
    (c) => c.rarity.toLowerCase() == "legendary"
  );

  return (
    <span className="self-center">
      <span>⚪ {common.length} common </span>
      <br></br>
      <span>🔵 {rare.length} rare</span>
      <br></br>
      <span>🟣 {epic.length} epic</span>
      <br></br>
      <span>🟡 {legendary.length} legendary</span>
    </span>
  );
}
