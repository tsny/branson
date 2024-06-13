"use client";

import { Card } from "@prisma/client";
import { Button } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import CatalogMain from "./catalog/catalog_main";
import { Cord } from "@/lib/cards";
import { sellCards } from "../actions";

interface SellerPanelProps {
  cords: Cord[];
}

export default function SellerPanel(props: SellerPanelProps) {
  let [dust, setDust] = useState(0);
  let [selectedCards, setSelectedCards] = useState<number[]>([]);

  const ref = useRef<HTMLFormElement>(null);

  const onCheck = (card: Card, ownershipId: number) => {
    const index = selectedCards.indexOf(ownershipId);
    const selectingCard = index === -1;
    if (selectingCard) {
      console.log("selecting %s", ownershipId);
      setDust(dust + card.dustValue);
      selectedCards.push(ownershipId);
      setSelectedCards(selectedCards);
    } else {
      console.log("unselecting %s", ownershipId);
      setDust(dust - card.dustValue);
      selectedCards.splice(index, 1);
      setSelectedCards(selectedCards);
    }
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
      <Button
        className="ml-2"
        type="submit"
        disabled={selectedCards?.length === 0}
      >
        Sell Selected for {dust} dust
      </Button>
      {props.cords.length == 0 && (
        <div className="text-xl text-bold">
          No cards!! Go open some packs in the store!!
        </div>
      )}
      <CatalogMain
        onChecked={onCheck}
        showCheckboxes={true}
        cords={props.cords}
        selectedIDs={selectedCards}
      ></CatalogMain>
    </form>
  );
}
