"use client";
import { Card } from "@prisma/client";
import { Button } from "flowbite-react";
import InvLinkHeader from "./linkHeader";
import { useEffect, useState } from "react";
import CatalogMain from "./catalog/catalog_main";

interface SellerPanelProps {
  cards: Card[];
}

export default function SellerPanel(props: SellerPanelProps) {
  let [dust, setDust] = useState(0);
  let [selectedCards, setSelectedCards] = useState<Card[]>();

  const onCheckBoxClick = (checked: boolean, card: Card) => {
    // setDust(dust + val);
    if (checked) {
    }
  };

  useEffect(() => {
    let sum = 0;
    selectedCards?.forEach((s) => sum + s.dustValue);
    setDust(sum);
  }, selectedCards);

  return (
    <div>
      <Button className="ml-2" disabled={true}>
        Sell Selected for {dust} dust
      </Button>
      {props.cards.length == 0 && (
        <div className="text-xl text-bold">
          No cards!! Go open some packs in the store!!
        </div>
      )}
      <CatalogMain
        onCheckBoxClick={onCheckBoxClick}
        showCheckboxes={true}
        cards={props.cards}
      ></CatalogMain>
    </div>
  );
}
