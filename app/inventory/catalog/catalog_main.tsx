"use client";

import { Card } from "@prisma/client";
import CardPreview from "../card_preview";
import { CardModal } from "../ViewCardModal";
import { useState } from "react";

interface CatalogMainProps {
  cards: Card[];
  showCheckboxes: boolean;
}

export default function CatalogMain(props: CatalogMainProps) {
  let [selectedCard, setSelectedCard] = useState<Card>();
  let [showModal, setShowModal] = useState(false);

  const cards = props.cards;
  let body = cards.map((c) => {
    return (
      <CardPreview
        onClick={() => {
          setSelectedCard(c);
          setShowModal(true);
        }}
        key={c.id}
        card={c}
        showCheckbox={props.showCheckboxes}
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
