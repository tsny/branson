"use client";

import { useState } from "react";
import CardTable from "./CardTable";
import { EditCardModal } from "./EditCard";
import AddCardButton from "./AddCardButton";
import { Card } from "@prisma/client";

interface EditorMainProps {
  cards: Card[];
}

export default function EditorMain(props: EditorMainProps) {
  let [showModal, setShowModal] = useState(false);
  let [cardToEdit, setCardToEdit] = useState<Card>();

  return (
    <div>
      <AddCardButton onClick={() => setShowModal(true)}></AddCardButton>
      <EditCardModal
        card={cardToEdit}
        onClose={() => {
          setCardToEdit(undefined);
          setShowModal(false);
        }}
        show={showModal}
      ></EditCardModal>
      <CardTable
        onEditClick={(id) => {
          setShowModal(true);
          setCardToEdit(props.cards.find((c) => c.id == id));
        }}
        cards={props.cards}
      ></CardTable>
    </div>
  );
}
