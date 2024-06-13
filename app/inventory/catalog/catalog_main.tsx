"use client";

import { Card } from "@prisma/client";
import CardPreview from "../card_preview";
import { CardModal } from "../ViewCardModal";
import { ReactNode, useState } from "react";
import { Cord } from "@/lib/cards";

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
}

export default function CatalogMain(props: CatalogMainProps) {
  let [selectedCard, setSelectedCard] = useState<Card>();
  let [showModal, setShowModal] = useState(false);

  let body: ReactNode;
  if (props.catalogCards) {
    body = props.catalogCards.map((c, i) => {
      return (
        <CardPreview
          onImgClick={() => {
            setSelectedCard(c.card);
            setShowModal(true);
          }}
          key={i}
          card={c.card}
          hidden={c.hidden}
        ></CardPreview>
      );
    });
  }

  if (props.cords) {
    body = props.cords.map((c, i) => {
      // console.log(c.id, props.selectedCards?.indexOf(c.id));
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
      <div className="m-2 grid grid-cols-3 gap-2">{body}</div>
    </div>
  );
}
