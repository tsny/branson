"use client";

import { unwrapPack } from "@/app/actions";
import { Button } from "flowbite-react";
import CardRevealer from "../CardReveal";
import { useState } from "react";
import { Card } from "@prisma/client";
import { CardModal } from "../ViewCardModal";
import HelpButton from "@/app/helpButton";

interface UnwrapperProps {
  unpackBtnDisabled: boolean;
}

export default function Unwrapper(props: UnwrapperProps) {
  let [unwrappedCards, setUnwrappedCards] = useState<Card[]>([]);
  let [revealCards, setRevealCards] = useState(false);
  let [revealOngoing, setRevealOngoing] = useState(false);
  let [showModal, setShowModal] = useState(false);
  let [selectedCard, setSelectedCard] = useState<Card>();

  let onRevealFinished = () => {
    setRevealOngoing(false);
  };

  return (
    <div>
      <CardModal
        onClose={() => setShowModal(false)}
        show={showModal}
        card={selectedCard}
      ></CardModal>
      <form
        className="flex justify-center"
        action={async (formData) => {
          let cards = await unwrapPack(formData);
          if (!cards) {
            return;
          }
          setUnwrappedCards(cards);
          setRevealCards(true);
          setRevealOngoing(true);
        }}
      >
        <Button
          className="mr-2"
          disabled={props.unpackBtnDisabled || revealOngoing}
          gradientDuoTone="pinkToOrange"
          type="submit"
        >
          Unpack
        </Button>
        <HelpButton
          title="What?"
          content="Buy a pack and see what's inside! Tap the card's image to view more details!"
        ></HelpButton>
      </form>
      <CardRevealer
        onRevealFinished={onRevealFinished}
        cards={unwrappedCards}
        start={revealCards}
        onPreviewClick={(c) => {
          setSelectedCard(c);
          setShowModal(true);
        }}
      ></CardRevealer>
    </div>
  );
}
