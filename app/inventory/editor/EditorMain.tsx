"use client";

import { useState } from "react";
import CardEditorTable from "./CardTable";
import { EditCardModal } from "./EditCard";
import AddCardButton from "./AddCardButton";
import { Card } from "@prisma/client";
import { CardStats } from "@/app/actions";
import { CardModal } from "../ViewCardModal";

interface EditorMainProps {
  cards: Card[];
  stats: CardStats[];
}

export default function EditorMain(props: EditorMainProps) {
  let [showEditModal, setShowEditModal] = useState(false);
  let [showViewModal, setViewShowModal] = useState(false);
  let [cardToEdit, setCardToEdit] = useState<Card>();
  let [viewedCard, setViewedCard] = useState<Card>();

  return (
    <div>
      <div className="ml-3">{props.cards.length} Cards</div>
      <AddCardButton onClick={() => setShowEditModal(true)}></AddCardButton>
      <CardModal
        onClose={() => setViewShowModal(false)}
        show={showViewModal}
        card={viewedCard}
      ></CardModal>
      <EditCardModal
        card={cardToEdit}
        onClose={() => {
          setCardToEdit(undefined);
          setShowEditModal(false);
        }}
        show={showEditModal}
      ></EditCardModal>

      <CardEditorTable
        onEditClick={(id) => {
          setShowEditModal(true);
          setCardToEdit(props.cards.find((c) => c.id == id));
        }}
        onViewClick={(id) => {
          setViewedCard(props.cards.find((c) => c.id == id));
          setViewShowModal(true);
        }}
        cards={props.cards}
        stat={props.stats}
      ></CardEditorTable>
    </div>
  );
}
