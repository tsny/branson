"use client";

import { Card } from "@prisma/client";
import CardPreview from "../card_preview";
import { CardModal } from "../ViewCardModal";
import { ReactNode, useState } from "react";
import { Cord } from "@/lib/prisma";

export interface CatalogCard {
  card: Card;
  hidden: boolean;
}

interface CatalogMainProps {
  cards?: Card[];
  catalogCards?: CatalogCard[];
  cords?: Cord[];

  showCheckboxes: boolean;
  selectedIDs?: number[];
  onChecked?: (card: Card, ownershipID: number) => void;
  titleTapViewsCard?: boolean;
}

export default function CatalogMain(props: CatalogMainProps) {
  let [selectedCard, setSelectedCard] = useState<Card>();
  let [showModal, setShowModal] = useState(false);

  const viewCard = (c: Card) => {
    setSelectedCard(c);
    setShowModal(true);
  };

  let body: ReactNode;
  if (props.catalogCards) {
    body = props.catalogCards.map((c, i) => {
      return (
        <CardPreview
          onImgClick={() => viewCard(c.card)}
          key={i}
          card={c.card}
          hidden={c.hidden}
          onChecked={() => {
            if (props.titleTapViewsCard) {
              viewCard(c.card);
            }
          }}
        ></CardPreview>
      );
    });
  }

  if (props.cords) {
    body = props.cords.map((c, i) => {
      return (
        <CardPreview
          onImgClick={() => {
            setSelectedCard(c.card);
            setShowModal(true);
          }}
          key={i}
          checked={
            props.selectedIDs ? props.selectedIDs?.indexOf(c.id) > -1 : false
          }
          card={c.card}
          onChecked={(card) => {
            if (props.onChecked) {
              props.onChecked(card, c.id);
            }
          }}
        ></CardPreview>
      );
    });
  }

  return (
    <div>
      <CardModal
        onClose={() => setShowModal(false)}
        show={showModal}
        card={selectedCard}
      ></CardModal>
      <div className="m-2 grid grid-cols-4 gap-1">{body}</div>
    </div>
  );
}
