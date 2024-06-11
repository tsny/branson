"use client";

import { Card as BCard } from "@prisma/client";
import CardPreview from "./card_preview";

interface CardRevealerProps {
  cards: BCard[];
  start: boolean;
  onRevealFinished: () => void;
}

export default function CardRevealer(props: CardRevealerProps) {
  let body = props.cards?.map((c, i) => {
    return (
      <CardPreview
        key={i}
        card={c}
        hidden={true}
        revealSelf={true}
        revealPauseInSeconds={i + 2}
        onRevealFinished={
          i == props.cards.length - 1 ? props.onRevealFinished : () => {}
        }
      />
    );
  });

  return <div className="m-2 grid grid-cols-3 gap-2">{body}</div>;
}
