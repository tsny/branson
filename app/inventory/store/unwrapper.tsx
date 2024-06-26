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
  let [revealing, setRevealing] = useState(false);
  let [showModal, setShowModal] = useState(false);
  let [selectedCard, setSelectedCard] = useState<Card>();

  let onRevealFinished = () => {
    setRevealing(false);
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
        onSubmit={() => setRevealing(true)}
        action={async (formData) => {
          let cards = await unwrapPack(formData);
          if (!cards) {
            console.log("err unwrapping pack");
            return;
          }
          setUnwrappedCards(cards);
          console.log("setting unwrapped cards to " + cards);
          setRevealCards(true);
        }}
      >
        <Button
          className="mr-2"
          disabled={props.unpackBtnDisabled || revealing}
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
      {unwrappedCards.length > 0 && (
        <div>
          {revealing && (
            <h1 className="mt-5 animate-pulse">
              Revealing your cards, hold on...
            </h1>
          )}
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
      )}
    </div>
  );
}
