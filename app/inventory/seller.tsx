"use client";

import { Card } from "@prisma/client";
import { Button } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import CatalogMain from "./catalog/catalog_main";
import { Cord } from "@/lib/prisma";
import { sellCards } from "../actions";
import HelpButton from "../helpButton";

interface SellerPanelProps {
  cords: Cord[];
  userDust: number;
}

export default function SellerPanel(props: SellerPanelProps) {
  let [dust, setDust] = useState(0);
  let [selectedCards, setSelectedCards] = useState<number[]>([]);

  const ref = useRef<HTMLFormElement>(null);

  const onCheck = (card: Card, ownershipId: number) => {
    const index = selectedCards.indexOf(ownershipId);
    const selectingCard = index === -1;
    if (selectingCard) {
      setDust(dust + card.dustValue);
      selectedCards.push(ownershipId);
    } else {
      setDust(dust - card.dustValue);
      selectedCards.splice(index, 1);
    }
    setSelectedCards(selectedCards);
    console.log(selectedCards);
  };

  return (
    <form
      action={async (formData) => {
        setSelectedCards([]);
        setDust(0);
        await sellCards(dust, selectedCards);
        ref.current?.reset();
      }}
      ref={ref}
    >
      <div className="sticky p-2 mx-2 text-xs text-justify top-2 bg-white border-gray-600 rounded border">
        <div className="flex gap-1 justify-between">
          <div className="text-justify self-center font-bold">
            You have {props.cords.length} cards and {props.userDust} dust!
          </div>
          <Button
            size={"sm"}
            type="submit"
            disabled={selectedCards?.length === 0}
          >
            Sell for {dust} dust
          </Button>
          <HelpButton
            title="What?"
            content="Tap the card's image to view more details! Tap the name of the card to select it. You can select multiple"
          ></HelpButton>
        </div>
      </div>
      <CatalogMain
        onChecked={onCheck}
        showCheckboxes={true}
        cords={props.cords}
        selectedIDs={selectedCards}
      ></CatalogMain>
    </form>
  );
}
