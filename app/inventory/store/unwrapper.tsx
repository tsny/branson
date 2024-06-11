"use client";

import { unwrapPack } from "@/app/actions";
import { Button } from "flowbite-react";
import CardRevealer from "../CardReveal";
import { useState } from "react";
import { Card } from "@prisma/client";

interface UnwrapperProps {
  unpackBtnDisabled: boolean;
}

export default function Unwrapper(props: UnwrapperProps) {
  let [unwrappedCards, setUnwrappedCards] = useState<Card[]>([]);
  let [revealCards, setRevealCards] = useState(false);
  let [revealOngoing, setRevealOngoing] = useState(false);

  let onRevealFinished = () => {
    setRevealOngoing(false);
  };

  return (
    <div>
      <form
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
          disabled={props.unpackBtnDisabled || revealOngoing}
          gradientDuoTone="pinkToOrange"
          type="submit"
        >
          Unpack
        </Button>
      </form>
      <CardRevealer
        onRevealFinished={onRevealFinished}
        cards={unwrappedCards}
        start={revealCards}
      ></CardRevealer>
    </div>
  );
}
