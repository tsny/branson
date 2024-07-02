"use client";

import { Card } from "@prisma/client";
import CardPreview from "./card_preview";
import { CardModal } from "./ViewCardModal";
import { ReactNode, useState } from "react";
import { group } from "console";

export interface CatalogCard {
  card: Card;
  hidden: boolean;
}

interface CatalogMainProps {
  cards?: Card[];
  catalogCards?: CatalogCard[];

  showCheckboxes: boolean;
  titleTapViewsCard?: boolean;
}

export default function CardCatalogViewer(props: CatalogMainProps) {
  let [selectedCard, setSelectedCard] = useState<Card>();
  let [showModal, setShowModal] = useState(false);

  const viewCard = (c: Card) => {
    setSelectedCard(c);
    setShowModal(true);
  };

  let cards = props.catalogCards;

  function cardToElement(c: CatalogCard) {
    return (
      <CardPreview
        onImgClick={() => {
          if (!c.hidden) {
            viewCard(c.card);
          }
        }}
        key={Math.random() * 100}
        card={c.card}
        hidden={c.hidden}
        onChecked={() => {
          if (props.titleTapViewsCard) {
            viewCard(c.card);
          }
        }}
      ></CardPreview>
    );
  }

  function groupCards(tag: string, title: string) {
    let grouping = cards?.map((cc) => {
      if (cc.card.type.includes(tag)) {
        return cardToElement(cc);
      }
    });
    return (
      <div className="text-4xl font-bold text-center mt-2">
        <div className="my-2 textual">{title}</div>
        <div className="grid grid-cols-4 gap-1">{grouping}</div>
      </div>
    );
  }

  const humanCards = groupCards("Human", "Humans");
  const creatureCards = groupCards("Creature", "Creatures");
  const teamCards = groupCards("Group", "Groups");
  const spellCards = groupCards("Spell", "Spells");
  const memoryCards = groupCards("Memory", "Memories");
  const locationCards = groupCards("Location", "Locations");
  const eventCards = groupCards("Event", "Events");

  return (
    <div className="p-1">
      <CardModal
        onClose={() => setShowModal(false)}
        show={showModal}
        card={selectedCard}
      ></CardModal>
      {humanCards}
      {creatureCards}
      {teamCards}
      {spellCards}
      {memoryCards}
      {locationCards}
      {eventCards}
    </div>
  );
}
