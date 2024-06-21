"use client";

import { Modal } from "flowbite-react";
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

  return (
    <Modal
      dismissible={true}
      show={props.show}
      size="md"
      onClose={props.onClose}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <BransonCard card={props.card}></BransonCard>
      </Modal.Body>
    </Modal>
  );
}
