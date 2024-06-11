"use client";

import { Card, CardOwnership } from "@prisma/client";
import CardPreview from "../card_preview";
import { CardModal } from "../ViewCardModal";
import { useState } from "react";

interface CatalogMainProps {
  cards: Card[];
  cardOwnerships?: CardOwnership[];

  showCheckboxes: boolean;
  onCheckBoxClick?: (b: boolean, card: Card) => void;
}

export default function CatalogMain(props: CatalogMainProps) {
  let [selectedCard, setSelectedCard] = useState<Card>();
  let [showModal, setShowModal] = useState(false);

  const cards = props.cards;

  let body = cards.map((c, i) => {
    return (
      <CardPreview
        onClick={() => {
          setSelectedCard(c);
          setShowModal(true);
        }}
        key={i}
        card={c}
        showCheckbox={props.showCheckboxes}
        onCheckBoxClick={(b, card) => {
          if (props.onCheckBoxClick) {
            props.onCheckBoxClick(card, b);
          }
        }}
      ></CardPreview>
    );
  });

  return (
    <div>
      <CardModal
        onClose={() => setShowModal(false)}
        show={showModal}
        card={selectedCard}
      ></CardModal>
      <form className="m-2 grid grid-cols-3 gap-2">{body}</form>
    </div>
  );
}
