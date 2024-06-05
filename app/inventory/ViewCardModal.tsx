"use client";

import { Button, Modal } from "flowbite-react";
import BransonCard from "./card";
import { Card as BCard } from "@prisma/client";

interface ViewCardProps {
  show: boolean;
  card?: BCard;
  onClose: () => void;
}

export function CardModal(props: ViewCardProps) {
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
