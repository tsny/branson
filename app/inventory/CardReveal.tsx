"use client";

import { Card as BCard } from "@prisma/client";
import CardPreview from "./card_preview";

interface CardRevealerProps {
  cards: BCard[];
  start: boolean;
  onRevealFinished: () => void;
  onPreviewClick?: (card: BCard) => void;
}

export default function CardRevealer(props: CardRevealerProps) {
  let body = props.cards?.map((c, i) => {
    return (
      <CardPreview
        key={i}
        card={c}
        hidden={true}
        revealSelf={true}
        animate={true}
        onImgClick={props.onPreviewClick}
        revealPauseInSeconds={i + 2}
        onRevealFinished={
          // Only do the reveal finished function on the final preview finishing
          i == props.cards.length - 1 ? props.onRevealFinished : () => {}
        }
      />
    );
  });

  return <div className="m-2 grid grid-cols-3 gap-2">{body}</div>;
}
