"use client";

import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Card } from "@prisma/client";
import { CardModal } from "../ViewCardModal";
import HelpButton from "@/app/helpButton";
import CardPreview from "../card_preview";
import { unwrapPack } from "@/app/actions";

interface UnwrapperProps {
  unpackBtnDisabled: boolean;
  cards: Card[];
}

export default function Unwrapper(props: UnwrapperProps) {
  const initialHiddenState = Array(props.cards.length).fill(true);

  let [showModal, setShowModal] = useState(false);
  let [selectedCard, setSelectedCard] = useState<Card>();
  let [busy, setBusy] = useState(false);
  let [cardHiddenStates, setCardHiddenStates] = useState(initialHiddenState);
  let [cards, setCards] = useState(props.cards);
  let [allRevealed, setAllRevealed] = useState(false);

  function resetHidden() {
    setCardHiddenStates(initialHiddenState);
  }

  useEffect(() => {
    if (props.cards.length == 0) {
      return;
    }
    setCards(props.cards);
    resetHidden();
  }, [props.cards]);

  useEffect(() => {
    let re = cardHiddenStates.every((e) => e === false);
    setAllRevealed(re);
    if (re) {
      console.log("all done!");
      setBusy(false);
    }
  }, [cardHiddenStates]);

  const previews = cards.map((c, i) => {
    const hidden = cardHiddenStates[i];
    return (
      <CardPreview
        key={i}
        hidden={hidden}
        card={c}
        animate={true}
        onImgClick={(b) => {
          if (!hidden) {
            setSelectedCard(b);
            setShowModal(true);
            return;
          }
          console.log(cardHiddenStates);
          setCardHiddenStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[i] = !newStates[i];
            return newStates;
          });
        }}
      />
    );
  });

  return (
    <div>
      <CardModal
        onClose={() => setShowModal(false)}
        show={showModal}
        card={selectedCard}
      ></CardModal>

      <form
        className="flex justify-center"
        onSubmit={() => {
          setCards([]);
          setBusy(true);
          setCardHiddenStates(initialHiddenState);
        }}
        action={async (formData) => {
          await unwrapPack();
        }}
      >
        <Button
          className="mr-2"
          disabled={props.unpackBtnDisabled || busy}
          gradientDuoTone="pinkToOrange"
          type="submit"
        >
          Open Pack
        </Button>
        <HelpButton
          title="What?"
          content="Buy a pack and see what's inside! Tap the card's image to view more details!"
        ></HelpButton>
      </form>

      <div>
        <div className="text-center text-xl animate-pulse mt-5">
          {!allRevealed && cards.length > 0 && "Tap each card to reveal it!"}
          {allRevealed && cards.length > 0 && "Tap a card to inspect it!"}
        </div>
      </div>

      <div className="m-2 grid grid-cols-3 gap-2">{previews}</div>
    </div>
  );
}
