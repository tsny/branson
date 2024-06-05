"use client";

import { useEffect, useState } from "react";
import { Card as BCard } from "@prisma/client";
import BransonCard from "./card";
import CardPreview from "./card_preview";

interface CardRevealerProps {
  cards: BCard[];
}

export default function CardRevealer(props: CardRevealerProps) {
  const [visibleCards, setVisibleCards] = useState([true, true, true]);

  useEffect(() => {
    const revealCards = () => {
      setTimeout(() => setVisibleCards([false, true, true]), 1000);
      setTimeout(() => setVisibleCards([false, false, true]), 2000);
      setTimeout(() => setVisibleCards([false, false, false]), 3000);
    };

    revealCards();
  }, []);

  return (
    <div className="m-2 grid grid-cols-3 gap-2">
      {/* <CardPreview card={props.cards[0]}></CardPreview> */}
      <CardPreview card={props.cards[0]} hidden={visibleCards[0]} />
      <CardPreview card={props.cards[1]} hidden={visibleCards[1]} />
      <CardPreview card={props.cards[2]} hidden={visibleCards[2]} />
    </div>
  );
}
