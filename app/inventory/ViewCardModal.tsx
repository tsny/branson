"use client";

import BransonCard from "./card";
import { Card as BCard } from "@prisma/client";
import SwipeableModal from "./editor/swiper";

interface ViewCardProps {
  show: boolean;
  card?: BCard;
  onClose: () => void;
}

export function CardModal(props: ViewCardProps) {
  return (
    <SwipeableModal show={props.show} onClose={props.onClose}>
      <BransonCard card={props.card}></BransonCard>
    </SwipeableModal>
  );
}
