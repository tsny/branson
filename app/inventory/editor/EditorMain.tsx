"use client";

import { useState } from "react";
import CardEditorTable from "./CardTable";
import { EditCardModal } from "./EditCard";
import AddCardButton from "./AddCardButton";
import { Card } from "@prisma/client";
import { CardStats } from "@/app/actions";

interface EditorMainProps {
  cards: Card[];
  stats: CardStats[];
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
      <CardEditorTable
        onEditClick={(id) => {
          setShowModal(true);
          setCardToEdit(props.cards.find((c) => c.id == id));
        }}
        cards={props.cards}
        stat={props.stats}
      ></CardEditorTable>
    </div>
  );
}
